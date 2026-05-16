import type { Customer } from '@/types/game';

const normalSentences = [
  '袋はいりません。',
  'あたため、お願いします。',
  'この時間も大変ですね。',
  '雨、止みませんね。',
];

const anomalySentences = [
  '地下の電車は、まだ来ますか。',
  '店長は全部知っています。',
  '同じものを、同じものを、同じものを。',
  'あなたの名前札、もう空白ですね。',
];

export function createCustomer(minute: number, index: number): Customer {
  const afterTwo = minute >= 120;
  const anomalyRoll = afterTwo ? (minute - 110) / 160 : 0;
  const isAnomaly = Math.random() < Math.min(0.55, anomalyRoll);
  const anomalies: Customer['anomaly'][] = ['faceless', 'repeating', 'too-still', 'fake'];
  const itemPool = ['onigiri-salmon', 'bento-night', 'green-tea', 'black-coffee', 'umbrella-clear'];
  const count = 1 + Math.floor(Math.random() * 3);
  const items = Array.from({ length: count }, () => itemPool[Math.floor(Math.random() * itemPool.length)]);

  return {
    id: `customer-${minute}-${index}`,
    name: isAnomaly ? '客らしきもの' : ['会社員', '学生', 'タクシー運転手', '近所の老人'][index % 4],
    sentence: isAnomaly ? anomalySentences[index % anomalySentences.length] : normalSentences[index % normalSentences.length],
    items,
    paidAmount: 1000 + (isAnomaly ? 2 : 0),
    anomaly: isAnomaly ? anomalies[index % anomalies.length] : 'none',
  };
}
