<template>
    <div class='pc-page-wrap'>
        <span class='showtotal' v-if='showTotal && !simple'>共<span>{{total}}</span>条</span>
        <ul v-if='!simple' class='page-list' :class='{"small-list":small}' @click="pageChange">
            <li data-name="prev" class="go-icon" :class="{'page-disabled': currentNum == 1}">
                <Icon data-name="prev" type='left'/>
            </li>
            <li :class="{'selected': currentNum == 1}">1</li>
            <li data-name="left" 
                @mouseenter="leftIconType='doubleleft'" 
                @mouseleave="leftIconType='ellipsis'"
                 class='no-border' v-if='currentNum - 3 > 1'>
                <Icon data-name="left" :type='leftIconType'/>
            </li>
            <li v-if='currentNum - 2 > 1'>{{currentNum - 2}}</li>
            <li v-if='currentNum - 1 > 1'>{{currentNum - 1}}</li>
            <li class='selected' v-if='currentNum > 1 && currentNum !== totalPageNum'>{{currentNum}}</li>
            <li v-if='currentNum + 1 < totalPageNum'>{{currentNum + 1}}</li>
            <li v-if='currentNum + 2 < totalPageNum'>{{currentNum + 2}}</li>
            <li
            data-name="right"
            @mouseenter="rightIconType='doubleright'" 
            @mouseleave="rightIconType='ellipsis'"
            class='no-border' v-if='currentNum + 3 < totalPageNum'>
                <Icon data-name="right" :type='rightIconType'/>
            </li>
            <li :class="{'selected': currentNum == totalPageNum}" v-if='totalPageNum > 1'>{{totalPageNum}}</li>
            <li data-name="next" class="go-icon" :class="{'page-disabled': currentNum == totalPageNum}">
                <Icon data-name="next" type='right'/>
            </li>
        </ul>
        <Options 
        :showJump='showJump'
        :showSize='showSize'
        :pageSizeOpts='pageSizeOpts'
        :current='currentNum'
        :totalPage='totalPageNum'
        :simple='simple'
        :small='small'
        @jumpPage='jumpPage'
        @sizeChange='sizeChange'
        />
    </div>
</template>

<script>
import Options from './options.vue';
import Icon from '../icon';

const prefix_page = 'pc-page-'

export default {
    name: 'PcPagination',
    components: { Options, Icon },
    props: {
        total: {
            type: Number,
            default: 1
        },
        current: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizeOpts: {
            type: Array,
            default() {
                return [10, 20, 30, 40]
            }
        },
        simple: Boolean,
        small: Boolean,
        showTotal: Boolean,
        showJump: Boolean,
        showSize: Boolean
    },
    data() {
        return {
            currentNum: this.current,
            pageSizeNum: this.pageSize,
            leftIconType: 'ellipsis',
            rightIconType: 'ellipsis'
        }        
    },
    watch: {
        current (val) {
            this.currentNum = Number(val);
        },
        pageSize (val) {
            this.pageSizeNum = Number(val);
        },
        pageSizeOpts: {
            deep: true,
            handler (arr, oldArr) {
                this.pageSizeNum = arr[0];
            }
        }
    },
    computed: {
        totalPageNum () {
            let total = Math.ceil(this.total / this.pageSizeNum);
            return total == 0 ? 1 : total;
        }
    },
    methods: {
        pageChange (e) {
            let target = e.target;
            let domList = document.getElementsByTagName('li');

            if (target.tagName == 'UL') {
                return;
            }

            if (target.dataset.name == 'prev') {
                this.currentNum = this.currentNum > 1 ? Number(this.currentNum) - 1 : 1;
            } else if (target.dataset.name == 'next') {
                this.currentNum = this.currentNum >= this.totalPageNum ? this.totalPageNum : Number(this.currentNum) + 1;
            } else if (target.dataset.name == 'left') {
                this.currentNum = this.currentNum - 5 >= 1 ? this.currentNum - 5 : 1;
            } else if (target.dataset.name == 'right') {
                this.currentNum = this.currentNum + 5 <= this.totalPageNum ? this.currentNum + 5 : this.totalPageNum;
            } else {
                this.currentNum = Number(e.target.textContent);
            }
            this.$emit('pageChange', this.currentNum);                
        },
        jumpPage (page) {
            this.currentNum = page;
            this.$emit('pageChange', this.currentNum);
        },
        sizeChange (pageSize) {
            this.pageSizeNum = pageSize;
            this.currentNum = 1;
            this.$emit('pageChange', this.currentNum);
            this.$emit('sizeChange', pageSize);  
        }
    }
}
</script>
