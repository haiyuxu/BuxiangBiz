import React, { PropsWithChildren } from 'react';
import { useLaunch } from '@tarojs/taro';
import './app.less';

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log('App launched.');
  });

  return children;
}

export default App;
