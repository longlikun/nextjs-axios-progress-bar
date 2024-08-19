'use client';
import { z, ZodType } from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// 验证文件上传
export const validationSchema = z.object({
  title: z.string().min(2, '名称不能小于2个字符').max(10, '名称最多为10个字符'),
  desc: z
    .string()
    .min(4, '名称不能小于4个字符')
    .max(200, '名称最多为200个字符'),
  fileUpload: z
    .custom<FileList>((v) => v instanceof FileList)
    .transform((val) => {
      console.log("val:", val); // 调试信息：打印输入值
      // if (val instanceof File) return val;
      if (val instanceof FileList) return val[0];
      return null;

    })
    // 验证文件大小
    .refine(
      (file) => file instanceof File && file.size <= MAX_FILE_SIZE,
      {message: `文件大小不能超过 ${MAX_FILE_SIZE / (1024 * 1024)} MB`, }
    )
    // 验证文件类型
    .refine(
      (file) =>
        file instanceof File &&
        ACCEPTED_IMAGE_TYPES.includes(
          file.type
        ),
      { message: '类型不支持,请选择 (jpeg, jpg, png, webp)类型', }
    )
  // .superRefine((file, ctx) => {
  //      console.log("val:", file); // 调试信息：打印输入值
  //   if (!(file instanceof File)) {
  //     console.log("Not a file",file); // 调试信息：文件类型检查失败
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       fatal: true,
  //       message: 'Not a file',
  //     });

  //     return z.NEVER;
  //   }

  //   if (file.size > 5 * 1024 * 1024) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'Max file size allowed is 5MB',
  //     });
  //   }

  //   if (
  //     !['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(
  //       file.type
  //     )
  //   ) {
  //     ctx.addIssue({
  //       code: z.ZodIssueCode.custom,
  //       message: 'File must be an image (jpeg, jpg, png, webp)',
  //     });
  //   }
  // })
  // .pipe(z.custom<File>()),

});
