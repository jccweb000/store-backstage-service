import xlsx from 'xlsx';

/**
 * 生成 Excel 文件
 * @param data 要导出的数据
 * @returns Excel 文件的 Buffer
 */
export const generateExcel = (data: any[], fileName: string) => {
  // 将数据转换为工作表
  const worksheet = xlsx.utils.json_to_sheet(data);

  // 创建工作簿
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, fileName);

  // 将工作簿转换为 Buffer
  const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });

  return buffer;
};