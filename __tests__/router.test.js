/**
 * @jest-environment jsdom
 */

 import { pushToHistory } from '../scripts/router.js';

 test('checks length of history stack', () => {
    expect(pushToHistory('settings')).toHaveProperty('length', 2);
    expect(pushToHistory('settings')).toHaveProperty('length', 3);
    expect(pushToHistory('')).toHaveProperty('length', 4);
    expect(pushToHistory('entry', 1)).toHaveProperty('length', 5);
    expect(pushToHistory('entry1')).toHaveProperty('length', 6); //tests default
    expect(pushToHistory(null)).toHaveProperty('length', 7);
});

test('checks current state object', () => {
    expect(pushToHistory('settings')).toHaveProperty('state.page', 'settings');
    expect(pushToHistory('entry', 1)).toHaveProperty('state.page', 'entry1');
    expect(pushToHistory('entry1')).toHaveProperty('state', {}); // tests default
    expect(pushToHistory(null)).toHaveProperty('state', {});
});