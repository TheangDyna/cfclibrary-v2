import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  makeStyles,
  Card
} from '@material-ui/core';
import Ctrlauth from './components/containers/Ctrlauth';
import { useRecoilValue } from 'recoil';
import { USERSTATE } from '../state/mapState';

const useStyles = makeStyles((theme) => ({
  body: {
    width: '100vw',
    height: '100vh',
    backgroundImage: 'url(https://picsum.photos/4000/2000)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  content: {
    width: 500,
    padding: '10px 20px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform:' translate(-50%, -50%)',
    borderRadius: 20,
    boxShadow: ' 2px 2px 3px 2px rgba(0,0,0,0.3)',
  }
}));

const authentication = () => {

  const classes = useStyles();
  const router = useRouter();
  const user = useRecoilValue(USERSTATE);

  useEffect(()=>{
    if(user){
      router.push('/home')
    }
  })
  
  return (
    <>
      <div
        className={classes.body}
      >

        <Card
          className={classes.content}
        >
          <Ctrlauth open={'signin'} />
        </Card>

      </div>
    </>
  );
}

export default authentication;