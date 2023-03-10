import type { Post } from "js/booru/types";

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function SplitPosts(posts: Post[], parts: number) {
	const buckets = Array.from(Array(parts), () => new Array());

	function reduceInsertPost(bucketIndex: number, post: Post): number {
		const currentBucket = buckets[bucketIndex];
		const nextBucketIndex = (bucketIndex + 1) % parts;
		const nextBucket = buckets[nextBucketIndex];

		if (getColumnHeight(currentBucket) > getColumnHeight(nextBucket)) {
			return reduceInsertPost(nextBucketIndex, post);
		} else {
			currentBucket.push(post);
			return nextBucketIndex;
		}
	}
	posts.reduce(reduceInsertPost, 0);
	return buckets;
}

function getColumnHeight(column: Post[]) {
	return column.reduce((total, post) => {
		const aspectRatio = post.full.height / post.full.width;
		return clamp(aspectRatio, 0.5, 2) + total;
	}, 0);
}
