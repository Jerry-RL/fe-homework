function findKthValueBySort(nums, k) {
  nums.sort((a, b) => b - a).slice(0, k);
  return nums[k-1]
};

export {
  findKthValueBySort
}