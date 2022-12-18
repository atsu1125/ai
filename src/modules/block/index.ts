import autobind from 'autobind-decorator';
import Module from '@/module';
import Message from '@/message';

export default class extends Module {
	public readonly name = 'follow';

	@autobind
	public install() {
		return {
			mentionHook: this.mentionHook
		};
	}

	@autobind
	private async mentionHook(msg: Message) {
		if (msg.text && msg.includes(['ブロック', 'ブロ解', 'block me'])) {
			if (!msg.user.isBlocking) {
				this.ai.api('blocking/create', {
					userId: msg.userId,
				});
				return {
					reaction: 'angry'
				};
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}
