import React from 'react';

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useState } from 'react';

interface ShowDialog {
  isSuccess: boolean;
  action: string

}

const ShowDialog: React.FC<ShowDialog> = ({ isSuccess, action }) => {
  let [isOpen, setIsOpen] = useState(true);

  function close() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={close}
    >
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          {isSuccess ? (
            <DialogPanel
              transition
              className='w-full max-w-lg h-52 rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                {action}成功
              </DialogTitle>
              <p className='mt-2 text-sm/6 text-black/50'>   文件已成功{action}。您可以现在查看或打开文件。如果您需要进一步操作，请根据提示进行。感谢您的耐心等待！</p>
              <div className='mt-4 '>
                <Button
                  className='inline-flex text-center items-center gap-2 rounded-md bg-green-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                  onClick={close}
                >
                 确定
                </Button>
              </div>
            </DialogPanel>
          ) : (
            <DialogPanel
              transition
              className='w-full h-52 max-w-lg rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
            >
              <DialogTitle
                as='h3'
                className='text-base/7 font-medium text-black'
              >
                {action}失败
              </DialogTitle>
              <p className='mt-2 text-sm/6 text-black/50'>
                文件{action}失败，可能是由于网络连接不稳定或服务器问题导致。请检查您的网络连接并稍后重试。如果问题仍然存在，请联系技术支持以获取帮助。
              </p>
              <div className='mt-4'>
                <Button
                  className='inline-flex items-center gap-2 rounded-md bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700'
                  onClick={close}
                >
                  确定
                </Button>
              </div>
            </DialogPanel>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ShowDialog;
