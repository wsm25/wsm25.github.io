function wslice(list,slist){
    var out=new Array();
    let len=list.length;
    for(let i=0;i<len;++i){
        if (slist.includes(i)){
            out.push(list[i]);}}
    return out;
}

const judgeArray=[
    [1,2,3],[4,5,6],[7,8,9],
    [1,4,7],[2,5,8],[3,6,9],
    [1,5,9],[3,5,7]
]

function judge(list){
    for(arr of judgeArray){
        if (wslice(list,arr).join('').length==arr.length){
            return true;
        }
    }
    return false;
}

var xostate='X'

const game={
    data(){
        return {
            getBoard:[
            [1,2,3],
            [4,5,6],
            [7,8,9]
            ],
            winned:'',
            length:10,
            xList:new Array(10).fill(''),
            oList:new Array(10).fill(''),
        }
    },
    methods:{
        pushXo(id){
            if (this.xoList[id]==='' && this.winned===''){
                if(xostate==='X'){
                    this.xList[id]='X';
                    if(judge(this.xList)){
                        this.winned='X';
                    }
                }else{
                    this.oList[id]='O';
                    if(judge(this.oList)){
                        this.winned='O';
                    }
                }
                xostate=(xostate==='X'?'O':'X');
            }
        },
        clear(){
            this.xList = new Array(10).fill('');
            this.oList = new Array(10).fill('');
            this.winned = ''
        }
    },
    computed:{
        xoList(){
            tmp=new Array(this.length).fill('');
            for (let i=1;i<10;++i){
                tmp[i]=
                  (this.xList[i]==='')?
                  this.oList[i]:this.xList[i];
            }
            return tmp;
        },
        notice(){
            if (this.winned!=''){
                return this.winned+' Wins!!!'
            }
            return ''
        }
    }
}

const Square={
    props: ['clear','xo'],
    emits: ['pushXo'],
    computed:{
        visible(){return this.xo===''?false:true;},
    },
    methods:{},
    template:`
    <button class="square" @click="this.$emit('pushXo')
    ">
        <div v-if="visible">{{this.xo}}</div>
    </button>
    `
}

const app=Vue.createApp(game)
app.component('square',Square)
app.mount('#game')