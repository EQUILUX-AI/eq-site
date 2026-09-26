import { getCollection } from 'astro:content';

// Energy Tips, newest first.
export async function getSortedTips() {
  const tips = await getCollection('tips');
  return tips.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
