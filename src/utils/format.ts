// 格式化大数值
export const formatCount = (count: number) => {
  if (count > 100000) {
    return Math.ceil(count / 10000) + '万'
  } else {
    return count
  }
}

export const getImageUrl = (
  imageUrl: string,
  width: number,
  height: number = width
): string => {
  return imageUrl + `?param=${width}y${height}`
}
