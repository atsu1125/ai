// AiOS bootstrapper

import 'module-alias/register';

import 藍 from './ai';
import config from './config';
import _log from './utils/log';
const pkg = require('../package.json');

import CoreModule from './modules/core';
import TalkModule from './modules/talk';
import BirthdayModule from './modules/birthday';
import ReversiModule from './modules/reversi';
import PingModule from './modules/ping';
import EmojiModule from './modules/emoji';
import EmojiReactModule from './modules/emoji-react';
import FortuneModule from './modules/fortune';
import GuessingGameModule from './modules/guessing-game';
import KazutoriModule from './modules/kazutori';
import KeywordModule from './modules/keyword';
import WelcomeModule from './modules/welcome';
import TimerModule from './modules/timer';
import DiceModule from './modules/dice';
import ServerModule from './modules/server';
import VersionModule from './modules/version';
import FollowModule from './modules/follow';
import ValentineModule from './modules/valentine';
// import MazeModule from './modules/maze';
import ChartModule from './modules/chart';
import SleepReportModule from './modules/sleep-report';
import NotingModule from './modules/noting';
import PollModule from './modules/poll';
import ReminderModule from './modules/reminder';

import * as chalk from 'chalk';
import fetch from 'node-fetch';
const promiseRetry = require('promise-retry');

console.log('   __    ____  _____  ___ ');
console.log('  /__\\  (_  _)(  _  )/ __)');
console.log(' /(__)\\  _)(_  )(_)( \\__ \\');
console.log('(__)(__)(____)(_____)(___/\n');

function log(msg: string): void {
	_log(`[Boot]: ${msg}`);
}

log(chalk.bold(`Ai v${pkg._v}`));
log(new Date().toString());	// For locale debug

promiseRetry(retry => {
	log(`Account fetching... ${chalk.gray(config.host)}`);

	// アカウントをフェッチ
	return fetch(`${config.apiUrl}/i`, {
		method: 'post',
		body: JSON.stringify({
			i: config.i
		}),
		headers: {
			'Content-Type': 'application/json'
		},
		timeout: 30 * 1000,
	}).then(res => {
		if (!res.ok) {
			throw `${res.status} ${res.statusText}`;
		} else {
			return res.json();
		}
	}).catch(retry);
}, {
	retries: 10,
	minTimeout: 10000,
}).then(account => {
	const acct = `@${account.username}`;
	log(chalk.green(`Account fetched successfully: ${chalk.underline(acct)}`));

	log('Starting AiOS...');

	// 藍起動
	new 藍(account, [
		new CoreModule(),
		new EmojiModule(),
		new EmojiReactModule(),
		new FortuneModule(),
		new GuessingGameModule(),
		new KazutoriModule(),
		new ReversiModule(),
		new TimerModule(),
		new DiceModule(),
		new TalkModule(),
		new PingModule(),
		new WelcomeModule(),
		new ServerModule(),
		new FollowModule(),
		new BirthdayModule(),
		new ValentineModule(),
		new KeywordModule(),
		new VersionModule(),
		// new MazeModule(),
		new ChartModule(),
		new SleepReportModule(),
		new NotingModule(),
		new PollModule(),
		new ReminderModule(),
	]);
}).catch(e => {
	log(chalk.red('Failed to fetch the account'));
});
