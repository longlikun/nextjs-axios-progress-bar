'use client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { error } from 'console';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import { tree } from 'next/dist/build/templates/app-page';
import ProgressBar from '@/app/components/ProgressBar';
import ShowDialog from '@/app/components/ShowDialog';
const navigation = [
  { name: '产品', href: '#' },
  { name: '特色', href: '#' },
  { name: '商店', href: '#' },
  { name: '公司', href: '#' },
];
const ProductsPage = () => {
  const [downloadProgress, setDownloadProgress] = useState<number>(0); //下载进度
  const [showDownloadProgress, setShowDownloadProgress] =
    useState<boolean>(false); //显示下载进度条
  const [showDialog, setShowDialog] = useState(false); //显示提示状态

  // 回调函数，用于在子组件中修改 showDialog
  const closeDialog = () => {
    setShowDialog(false);
  };
  const handleDownload = () => {
    console.log('handle download');
    setShowDownloadProgress(true);
    mutation.mutate();
  };
  const mutation = useMutation({
    mutationFn: async () => {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
      const url = `${API_BASE_URL}/download`;

      const response = await axios.post(
        url,
        {
          path: 'path/', //exp:path/
          filename: 'kongzi', //exp:abc
          format: 'png', //exp:jpg
        },
        {
          responseType: 'blob',
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total || 0;
            const percentage = Math.round((progressEvent.loaded * 100) / total);
            // 显示下载条
            setDownloadProgress(percentage);
          },
        }
      );

      if (response.status === 200) {
        console.log('123');
        const url = window.URL.createObjectURL(response.data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'kongzi' + '.' + 'png'; // 拼接文件全名
        link.click();
        window.URL.revokeObjectURL(url);
      }
      console.log(response);
    },
    onMutate: () => {},

    onSuccess: () => {},
    onError: () => {},
    onSettled: () => {
      setShowDownloadProgress(false);
      setDownloadProgress(0);
    },
  });

  return (
    <div className='bg-white'>
      <header className='absolute inset-x-0 top-0 z-50'>
        <nav
          aria-label='Global'
          className='flex items-center justify-between p-6 lg:px-8'
        >
          <div className='flex lg:flex-1'>
            <a href='#' className='-m-1.5 p-1.5'>
              <span className='sr-only'>Your Company</span>
              <Image
                width={200}
                height={200}
                alt=''
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                className='h-8 w-auto'
              />
            </a>
          </div>
          <div className='flex lg:hidden'>
            <button
              type='button'
              onClick={() => true}
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            >
              <span className='sr-only'>Open main menu</span>
            </button>
          </div>
          <div className='hidden lg:flex lg:gap-x-12'>
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className='text-md font-semibold leading-6 text-gray-900'
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className='hidden lg:flex lg:flex-1 lg:justify-end'>
            <a
              href='#'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              登录 <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          />
        </div>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
              Nextjs 实现下载进度条
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>@longlikun</p>

            {mutation.isError && <ShowDialog isSuccess={false}></ShowDialog>}
            {mutation.isSuccess && <ShowDialog isSuccess={true}></ShowDialog>}

            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <button
                type='submit'
                onClick={handleDownload}
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                立即下载
              </button>
            </div>
            {mutation.isPending && (
              <ProgressBar downloadProgress={downloadProgress}></ProgressBar>
            )}
          </div>
        </div>
        <div
          aria-hidden='true'
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
