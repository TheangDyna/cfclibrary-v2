import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { USERSTATE, LOADINGSTATE, BOOKS, RBOOKS, ALLUSER, CURRENTUSER, USERSAVE, USERED, DLRBO, DLBO, CLDEBO, CLUPBO, CLOSE, DLBOBO, BOBOOKS} from "../../../state/mapState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { fireAuth, firestore } from "../../../services/firebase";
import { useState } from "react";

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(USERSTATE);
  const [loading, setLoading] = useRecoilState(LOADINGSTATE);
  const [dlRBo, setDlRBo] = useRecoilState(DLRBO);
  const [dlBo, setDlBo] = useRecoilState(DLBO);
  const [dlBoBo, setDlBoBo] = useRecoilState(DLBOBO);
  const setBooks = useSetRecoilState(BOOKS);
  const setRBooks = useSetRecoilState(RBOOKS);
  const setBoBooks = useSetRecoilState(BOBOOKS);
  const setAllUser = useSetRecoilState(ALLUSER);
  const [currentUser, setCurrentUser] = useRecoilState(CURRENTUSER);
  const [userSave, setUserSave] = useRecoilState(USERSAVE);
  const setUsered = useSetRecoilState(USERED);
  const [re, setRe] = useState(false);
  const [reB, setReB] = useState(false);
  const [reR, setReR] = useState(false);
  const clDeBo = useRecoilValue(CLDEBO);
  const clUpBo = useRecoilValue(CLUPBO);
  const close = useRecoilValue(CLOSE);
  
  useEffect(async () => {
    const unSubcribed = await fireAuth.onAuthStateChanged((person) => {
      if (!person) {
        setUser(null);
        setLoading(false);
      } else {
        setUser({
          uid: person?.uid
        });
      }
    });
    return () => unSubcribed();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading]);

  useEffect(()=>{
    if(user?.uid){
      firestore.collection('users')
      .where('uid', '==', user.uid).get()
      .then((res)=>{
        let data =[];
        res.docs.map((item)=>{
          data.push({
            id: item.id,
            ...item.data(),
          })
        })
        setUserSave(false);
        setCurrentUser(data[0]);
      })
    }
  },[userSave,user])

  useEffect(()=>{
    if(currentUser?.email === 'cfclibrary@gmail.com'){
      setUsered(false);
    }else{
      setUsered(true);
    }
  },[currentUser])

  useEffect(() => {
    firestore.collection('users')
      .onSnapshot((snapshot) => {
        let userData = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))
        let sortUser = userData.sort((a, b) => (a.createAtN > b.createAtN) ? 1 : ((b.createAtN > a.createAtN) ? -1 : 0));
        let reverseUser = sortUser.reverse();
        setAllUser(reverseUser);
      })
  }, []);

  useEffect(() => {
    firestore.collection('books')
      .onSnapshot((snapshot) => {
        let bookData = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))
        let sortBook = bookData.sort((a, b) => (a.createAtN > b.createAtN) ? 1 : ((b.createAtN > a.createAtN) ? -1 : 0));
        let reverseBook = sortBook.reverse();
        setDlBo(reverseBook);
        setRe(true);
      })
  }, []);
  
  useEffect(() => {
    firestore.collection('books')
      .onSnapshot((snapshot) => {
        let bookData = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))
        let sortBook = bookData.sort((a, b) => (a.createAtN > b.createAtN) ? 1 : ((b.createAtN > a.createAtN) ? -1 : 0));
        let reverseBook = sortBook.reverse();
        let randomBook = reverseBook.sort(() => { return 0.5 - Math.random() })
        setDlRBo(randomBook);
        setReR(true);
      })
  }, []);

  useEffect(() => {
    firestore.collection('books')
      .onSnapshot((snapshot) => {
        let bookData = snapshot.docs.map((doc) => (
          {
            id: doc.id,
            ...doc.data()
          }
        ))
        let sortBook = bookData.sort((a, b) => (a.borrow > b.borrow) ? 1 : ((b.borrow > a.borrow) ? -1 : 0));
        let reverseBook = sortBook.reverse();
        setDlBoBo(reverseBook);
        setReB(true);
      })
  }, []);

  useEffect(()=>{
    if(dlRBo){
      setRBooks(dlRBo);
    }
  },[reR,clDeBo, clUpBo, close])

  useEffect(()=>{
    if(dlBo){
      setBooks(dlBo);
    }
  },[re, clDeBo, clUpBo, close])

  useEffect(()=>{
    if(dlBoBo){
      setBoBooks(dlBoBo);
    }
  },[reB, clDeBo, clUpBo, close])

return (
  <div>
    {children}
  </div>
);
}

export default AuthGuard;