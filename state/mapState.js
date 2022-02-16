import { atom } from "recoil";
const RESET = atom({
    key: 'RESET',
    default: '',
});

const CLOSE = atom({
    key: 'CLOSE',
    default: false,
});

const BOOKS = atom({
    key: 'BOOKS',
    default: [],
});

const RBOOKS = atom({
    key: 'RBOOKS',
    default: [],
});

const BOBOOKS = atom({
    key: 'BOBOOKS',
    default: [],
});

const DLRBO = atom({
    key: 'DLRBO',
    default: [],
});

const DLBO = atom({
    key: 'DLBO',
    default: [],
});

const DLBOBO = atom({
    key: 'DLBOBO',
    default: [],
});

const USERSTATE = atom({
    key: 'USERSTATE',
    default: null,
});

const LOADINGSTATE = atom({
    key: "LOADINGSTATE",
    default: true,
});

const CLUPBO = atom({
    key: 'CLUPBO',
    default: false,
});

const BOOK = atom({
    key: 'BOOK',
    default: {},
});

const USER = atom({
    key: 'USER',
    default: {},
});

const ALLUSER = atom({
    key: 'ALLUSER',
    default: [],
});

const CLDEBO = atom({
    key: 'CLDEBO',
    default: false,
});

const CLDEU = atom({
    key: 'CLDEU',
    default: false,
});

const CLUPU = atom({
    key: 'CLUPU',
    default: false,
});

const CURRENTUSER = atom({
    key: 'CURRENTUSER',
    default: '',
})

const CLEDU = atom({
    key: 'CLEDU',
    default: false,
})

const FETCHUSER = atom({
    key: 'FETCHUSER',
    default: null,
})

const CLDE = atom({
    key: 'CLDE',
    default: false,
})

const USERSAVE = atom({
    key: 'USERSAVE',
    default: false,
})

const USERED = atom({
    key: 'USERED',
    default: true,
})

const REF = atom({
    key: 'REF',
    default: false
})

export {
    RESET,
    CLOSE,
    BOOKS,
    USERSTATE,
    LOADINGSTATE,
    CLUPBO,
    BOOK,
    CLDEBO,
    RBOOKS,
    ALLUSER,
    USER,
    CLDEU,
    CLUPU,
    CURRENTUSER,
    CLEDU,
    FETCHUSER,
    CLDE,
    USERSAVE,
    USERED,
    DLRBO,
    DLBO,
    DLBOBO,
    REF,
    BOBOOKS,

}