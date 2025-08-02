import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import HelloComponent from '../src/components/hello/index.vue'
import { userApi } from '../src/api'

// Mock userApi.getCode
vi.mock('../src/api', () => ({
  userApi: {
    getCode: vi.fn()
  }
}))

describe('Hello Component', () => {
  it('renders with default props', () => {
    const wrapper = mount(HelloComponent, {
      props: {
        title: 'Test Title'
      }
    })
    
    expect(wrapper.find('.title').text()).toBe('Test Title')
    expect(wrapper.find('.logo').attributes('src')).toBe('/static/logo.png')
    expect(wrapper.find('.scss-title').exists()).toBe(true)
    expect(wrapper.find('.less-title').exists()).toBe(true)
  })

  it('renders with custom props', () => {
    const wrapper = mount(HelloComponent, {
      props: {
        title: 'Custom Title',
        logoSrc: '/custom-logo.png',
        scssTitle: 'Custom SCSS',
        lessTitle: 'Custom LESS',
        showScssTitle: true,
        showLessTitle: false
      }
    })

    expect(wrapper.find('.title').text()).toBe('Custom Title')
    expect(wrapper.find('.logo').attributes('src')).toBe('/custom-logo.png')
    expect(wrapper.find('.scss-title').text()).toBe('Custom SCSS')
    expect(wrapper.find('.less-title').exists()).toBe(false)
  })

  it('successfully gets verification code', async () => {
    const mockCode = { num: 123456 }
    vi.mocked(userApi.getCode).mockResolvedValue(mockCode)

    const wrapper = mount(HelloComponent, {
      props: {
        title: 'Test Title'
      }
    })

    const result = await wrapper.vm.getVerifyCode('13800138000')
    
    expect(userApi.getCode).toHaveBeenCalledWith('13800138000')
    expect(result).toBe(mockCode.num)
    expect(wrapper.find('.code-area').text()).toContain('验证码: 123456')
  })

  it('handles error when getting verification code', async () => {
    vi.mocked(userApi.getCode).mockRejectedValue(new Error('API Error'))

    const wrapper = mount(HelloComponent, {
      props: {
        title: 'Test Title'
      }
    })

    const result = await wrapper.vm.getVerifyCode('13800138000')
    
    expect(userApi.getCode).toHaveBeenCalledWith('13800138000')
    expect(result).toBeNull()
    expect(wrapper.find('.code-area').exists()).toBe(false)
  })
})