<template>
  <view class="hello">
    <image class="logo" :src="logoSrc" />
    <view class="text-area">
      <button class="btn" @click="() => getVerifyCode('13800138000')">getVerifyCode</button>
    </view>
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view v-if="showScssTitle" class="scss-title">{{ scssTitle }}</view>
    <view v-if="showLessTitle" class="less-title">{{ lessTitle }}</view>
    <view class="code-area" v-if="code">
      <text>验证码: {{ code }}</text>
    </view>
    
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { userApi } from '@/api'

interface Props {
  title: string
  logoSrc?: string
  scssTitle?: string
  lessTitle?: string
  showScssTitle?: boolean
  showLessTitle?: boolean
}

withDefaults(defineProps<Props>(), {
  logoSrc: '/static/logo.png',
  scssTitle: '这是scss 全局变量的样式',
  lessTitle: '这是less 全局变量的样式',
  showScssTitle: true,
  showLessTitle: true
})

const code = ref<number | null>(null)

async function getVerifyCode(phone: string) {
  try {
    const res = await userApi.getCode(phone)
    code.value = res.num
    return res.num
  } catch (error) {
    console.error('获取验证码失败:')
    return null
  }
}

defineExpose({
  getVerifyCode
})
</script>

<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.code-area {
  margin-top: 20rpx;
  font-size: 32rpx;
  color: #333;
}
</style>

<style lang="scss" scoped>
.scss-title {
  font-size: $title-size;
  color: $title-color;
}
</style>

<style lang="less" scoped>
.less-title {
  font-size: @title-size;
  color: @title-color;
}
</style>
