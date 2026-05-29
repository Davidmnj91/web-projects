# 🍼 Lista de Nacimiento de Victoria - Guía de Despliegue en Homelab

Esta es una aplicación web interactiva, moderna y auto-alojable construida con **Astro (SSR)**, **Tailwind CSS v4**, **SQLite** (vía `@libsql/client`), **PocketID OAuth** y **Resend**. Está optimizada para ejecutarse con un rendimiento excepcional y un consumo mínimo de recursos, haciéndola ideal para ser desplegada en un **LXC de Proxmox** (Debian, Ubuntu o Alpine) en tu homelab.

---

## 🏗️ Requisitos Previos en el LXC de Proxmox

Para desplegar la aplicación en tu contenedor LXC, asegúrate de tener instalado:

1. **Node.js v22 o superior** (Astro 6 requiere Node.js 22+).
2. **pnpm** (el gestor de paquetes del monorepo).
3. **Nginx** (u otro proxy reverso como Caddy/Traefik para gestionar el SSL y el dominio).

Puedes instalar Node.js 22 y pnpm en tu LXC basado en Debian/Ubuntu con los siguientes comandos:

```bash
# Instalar Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar pnpm globalmente
sudo npm install -g pnpm
```

---

## ⚙️ Configuración de Variables de Entorno

Crea un archivo de configuración `.env` en el directorio de la aplicación (`apps/lista-nacimiento/`). Puedes usar el archivo [.env.example](file:///C:/Users/david/Documents/web-projects/apps/lista-nacimiento/.env.example) como base:

```ini
# --- BASE DE DATOS (SQLite) ---
# Almacenamiento local auto-contenido. En Proxmox LXC se recomienda apuntar a un directorio persistente
DATABASE_URL=file:/data/birth_list.db

# --- SEGURIDAD ---
# Clave aleatoria larga para firmar las cookies de sesión (JWT) del administrador
SESSION_SECRET=un_secreto_super_seguro_y_largo_generado_por_ti

# --- AUTENTICACIÓN POCKETID (OIDC) ---
# Deja estos valores vacíos en local para usar el Bypass (Mock Login) rápido de desarrollo.
POCKETID_URL=https://pocketid.petrolab.es
POCKETID_CLIENT_ID=tu_client_id_desde_pocketid
POCKETID_CLIENT_SECRET=tu_client_secret_desde_pocketid
POCKETID_REDIRECT_URI=https://lista.petrolab.es/api/auth/callback

# --- ENVÍO DE CORREOS CON RESEND ---
RESEND_API_KEY=re_tu_api_key_de_resend
FROM_EMAIL=Lista de Victoria <victoria@send.petrolab.es>
```

> [!IMPORTANT]
> **Persistencia en LXC**: Asegúrate de que el directorio donde coloques la base de datos (por ejemplo, `/data/`) exista en tu LXC y que el usuario que ejecute la aplicación tenga permisos de lectura y escritura:
>
> ```bash
> sudo mkdir -p /data
> sudo chown -R $USER:$USER /data
> ```

---

## 🚀 Despliegue Paso a Paso (Node.js Standalone)

Dado que configuramos Astro con el adaptador `@astrojs/node` en modo `standalone`, la aplicación se compila como un servidor HTTP nativo e independiente.

### Paso 1: Instalar y Compilar

Navega a la raíz de tu monorepo y ejecuta los comandos de instalación y compilación filtrados:

```bash
# Instalar dependencias del monorepo
pnpm install --frozen-lockfile

# Compilar la aplicación de la lista de nacimiento en modo producción
pnpm --filter @web-projects/lista-nacimiento build
```

Esto generará la carpeta `dist/` en `apps/lista-nacimiento/dist/` conteniendo la aplicación optimizada.

### Paso 2: Probar en Local / LXC

Puedes arrancar el servidor temporalmente para verificar su correcto funcionamiento:

```bash
PORT=3000 HOST=0.0.0.0 node apps/lista-nacimiento/dist/server/entry.mjs
```

Abre en tu navegador `http://<IP_DE_TU_LXC>:3000` y comprueba que la landing page sembrada con los regalos por defecto cargue perfectamente.

---

## 🛠️ Configuración como Servicio persistente (Systemd)

Para garantizar que tu aplicación se inicie automáticamente cuando se encienda el LXC de Proxmox y se reinicie sola en caso de fallos, configúrala como un servicio de **Systemd**.

1. Crea el archivo de servicio:

   ```bash
   sudo nano /etc/systemd/system/lista-victoria.service
   ```

2. Pega la siguiente configuración (ajusta las rutas `/home/usuario/...` a las de tu LXC real):

   ```ini
   [Unit]
   Description=Servidor Lista de Nacimiento Victoria
   After=network.target

   [Service]
   Type=simple
   User=david
   WorkingDirectory=/home/david/web-projects/apps/lista-nacimiento
   Environment=NODE_ENV=production
   Environment=PORT=3000
   Environment=HOST=127.0.0.1
   # Carga el archivo .env automáticamente
   EnvironmentFile=/home/david/web-projects/apps/lista-nacimiento/.env
   ExecStart=/usr/bin/node dist/server/entry.mjs
   Restart=on-failure
   RestartSec=5

   [Install]
   WantedBy=multi-user.target
   ```

3. Recarga systemd, habilita e inicia el servicio:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable lista-victoria
   sudo systemctl start lista-victoria
   ```

4. Comprueba el estado del servicio:
   ```bash
   sudo systemctl status lista-victoria
   ```

---

## 🔒 Configuración de Proxy Reverso (Nginx + SSL)

Para exponer de forma segura la web usando tu subdominio (`lista.petrolab.es` o similar) con HTTPS:

1. Crea una configuración de sitio en Nginx:

   ```bash
   sudo nano /etc/nginx/sites-available/lista-victoria
   ```

2. Agrega la siguiente configuración redirigiendo el tráfico al puerto local `3000`:

   ```nginx
   server {
       listen 80;
       server_name lista.petrolab.es;

       # Redirección de imágenes locales subidas
       location /uploads/ {
           alias /home/david/web-projects/apps/lista-nacimiento/public/uploads/;
           expires 30d;
           add_header Cache-Control "public, no-transform";
       }

       location / {
           proxy_pass http://127.0.0.1:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded-for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

3. Habilita el sitio y recarga Nginx:

   ```bash
   sudo ln -s /etc/nginx/sites-available/lista-victoria /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

4. Genera tu certificado SSL gratuito con **Let's Encrypt / Certbot**:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx -y
   sudo certbot --nginx -d lista.petrolab.es
   ```

---

## 💾 Copias de Seguridad (Backups) de la Base de Datos

Una de las grandes ventajas de usar **SQLite** es la facilidad para hacer copias de seguridad. Al guardarse todo en un único archivo físico, para respaldar el estado completo de la aplicación (regalos creados y reservas realizadas por tus invitados) solo necesitas copiar el archivo de base de datos.

Puedes configurar una tarea programada (_Cronjob_) en el LXC para realizar un respaldo diario a tu NAS u otro disco:

```bash
# Editar crontab del LXC
crontab -e

# Añadir esta regla para hacer un backup diario a las 3:00 AM
0 3 * * * cp /data/birth_list.db /data/backups/birth_list_$(date +\%F).db
```

¡Listo! Tienes un despliegue de grado de producción, robusto, seguro y sumamente fácil de mantener en tu homelab. 🍼👶💖
