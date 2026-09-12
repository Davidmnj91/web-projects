import mailhog from 'mailhog'
import { GenericContainer } from 'testcontainers'

import type { StartedTestContainer } from 'testcontainers'

export class MailhogContainer {
  container!: StartedTestContainer
  client!: mailhog.API
  smtpHost!: string
  smtpPort!: number

  static async create(): Promise<MailhogContainer> {
    const mailHogContainer = new MailhogContainer()
    await mailHogContainer.start()
    return mailHogContainer
  }

  async start(): Promise<void> {
    try {
      this.container = await new GenericContainer('mailhog/mailhog').withExposedPorts(1025, 8025).start()
      this.smtpHost = this.container.getHost()
      this.smtpPort = this.container.getMappedPort(1025)

      this.client = mailhog({
        host: this.container.getHost(),
        port: this.container.getMappedPort(8025),
      })
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async refreshInbox(): Promise<void> {
    await this.client.deleteAll()
  }

  async stop(): Promise<void> {
    await this.container.stop({ timeout: 1000 })
  }
}
