// 生成热度区间，供解释性热度覆盖层使用。
export function buildSignalGradients(length = 750) {
  const blocks = [];
  const step = Math.floor(length / 6);
  for (let i = 0; i < 6; i += 1) {
    const intensity = 0.2 + ((i % 3) * 0.18);
    blocks.push({
      start: i * step,
      end: i === 5 ? length : (i + 1) * step,
      intensity,
    });
  }
  return blocks;
}
