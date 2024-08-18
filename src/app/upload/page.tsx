'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { validationSchema } from '../lib/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface UploadFormInputs {
    title: string;
    desc: string;
    fileUpload: File | null;
}

export default function UploadPage() {
    const [fileUpload, setFileUpload] = useState<File | null>(null); //设置获取文件
    const [fileName, setFileName] = useState<string>(''); //选择后显示文件的路径

    // 重置文件选择
    const handleRemoveFile = () => {
        setFileName('');
        setValue('fileUpload', null); // 重置文件输入字段
    };
    //重置表单
    const handleReset = () => {
        reset();
        setFileName('');
    };

    const {
        register,
        reset,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<UploadFormInputs>({
        defaultValues: {
            title: '',
            desc: '',
            fileUpload: null,
        },
        resolver: zodResolver(validationSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        console.log('files', files);

     
        if (files && files.length > 0) {
            // setValue('fileUpload', files[0]); // 更新状态
            setFileUpload(files[0]); // 更新状态
        }
 
    };

    //获取请求地址
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const url = `${API_BASE_URL}/upload`;
    //提交表单
    const onSubmit = async (data: UploadFormInputs) => {
        console.log('hanle submit', data);

       const formData = new FormData();
     
            // 将表单数据添加到 FormData 中
        formData.append('title', data.title);
        formData.append("desc", data.desc);

        if (fileUpload instanceof File) {
            formData.append('fileUpload', fileUpload); // 确保类型为 File
        }
        // try {
        //     const response = await axios.post(url, formData, {
        //         onUploadProgress: (progressEvent: any) => {
        //             const progress = Math.round(
        //                 (progressEvent.loaded / progressEvent.total) * 100
        //             );
        //         },
        //     });

        //     if (response.status === 200) {
        //         console.log("File uploaded successfully");
        //         reset(); // 重置表单
        //         // 跳转到上一个历史路由
        //         // router.replace("/upload");
        //     } else {
        //         console.error("Failed to upload file");
        //         // router.replace("/upload");

        //     }
        // } catch (err) {

        //     console.error("Failed to upload file", err);
        // }
    };
    return (
        <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-lg'>
                <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
                    上传文件进度条
                </h1>

                <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
                    sunt dolores deleniti inventore quaerat mollitia?
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'
                >
                    <p className='text-center text-lg font-medium'>上传文件</p>

                    <div className='col-span-full'>
                        <label
                            htmlFor='title'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            文件名称
                        </label>
                        <div className='relative'>
                            <input
                                {...register('title', { required: true, maxLength: 10 })}
                                type='text'
                                className='w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm'
                                placeholder='请填写文件名'
                            />

                            {errors.title && (
                                <p className='text-red-500 '>
                                    ⚠ 验证错误:{errors.title.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className='col-span-full'>
                        <label
                            htmlFor='desc'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            文件简介
                        </label>
                        <div className='mt-2'>
                            <textarea
                                id='desc'
                                {...register('desc', { required: true, maxLength: 200 })}
                                placeholder='请填写文件简介'
                                rows={3}
                                className='block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6'
                                defaultValue={''}
                            />
                            {/* useform 错误信息 */}
                            {errors.desc && (
                                <p className='text-red-500 '>⚠ {errors.desc.message}</p>
                            )}
                        </div>
                    </div>
                    <div className='col-span-full'>
                        <label
                            htmlFor='fileUpload'
                            className='block text-sm font-medium leading-6 text-gray-900'
                        >
                            选择文件
                        </label>
                        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-4'>
                            <div className='text-center'>
                                <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                    <label
                                        htmlFor='fileUpload'
                                        className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                                    >
                                        <span>选择文件</span>
                                        <span>{fileName}1</span>

                                        <input
                                            {...register('fileUpload', {
                                                required: true,
                                            })}
                                            type='file'
                                            id='fileUpload'
                                            className='sr-only'
                                            onChange={handleFileChange}
                                        />
                                        {errors?.fileUpload && (
                                            <p className='text-red-500 '>
                                                ⚠ {errors?.fileUpload?.message}
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
                    >
                        上传
                    </button>
                    <button
                        onClick={handleReset}
                        type='button'
                        className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
                    >
                        取消
                    </button>
                </form>
            </div>
        </div>
    );
}
