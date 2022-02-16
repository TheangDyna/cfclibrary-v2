import React, { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Forgetpass from './Forgetpass';
import { RESET } from '../../../state/mapState';
import { useRecoilValue } from 'recoil';
const CtrlAuth = ({open}) => {

    const [auth, setAuth]= useState(open);
    const reset = useRecoilValue(RESET);
    return (
        <div>
            {
                auth == 'signin' ? <Signin signup={()=>setAuth('signup')} forgetpass={()=>setAuth('forgetpass')} /> 
                : auth == 'signup' ? <Signup signin={()=>setAuth('signin')} />
                : auth == 'forgetpass' ? <Forgetpass signup={()=>setAuth('signup')} signin={()=>setAuth('signin')}/>
                : auth == reset ? <Forgetpass signup={()=>setAuth('signup')} signin={()=>setAuth('signin')}/>
                : null
            }
        </div>
     );
}
 
export default CtrlAuth;