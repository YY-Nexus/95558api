// 简化的验证函数
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 6
}

export function validateRequired(value: any): boolean {
  return value !== null && value !== undefined && value !== ""
}

export function validateArticle(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!validateRequired(data.title)) {
    errors.push("标题不能为空")
  }

  if (!validateRequired(data.content)) {
    errors.push("内容不能为空")
  }

  if (!validateRequired(data.author)) {
    errors.push("作者不能为空")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateSnippet(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!validateRequired(data.title)) {
    errors.push("标题不能为空")
  }

  if (!validateRequired(data.code)) {
    errors.push("代码不能为空")
  }

  if (!validateRequired(data.language)) {
    errors.push("编程语言不能为空")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// 验证规则常量
export const VALIDATION_RULES = {
  EMAIL: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "请输入有效的邮箱地址",
  },
  PASSWORD: {
    minLength: 6,
    maxLength: 50,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: "密码必须包含大小写字母和数字，长度6-50位",
  },
  PHONE: {
    pattern: /^1[3-9]\d{9}$/,
    message: "请输入有效的手机号码",
  },
  USERNAME: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_]+$/,
    message: "用户名只能包含字母、数字和下划线，长度3-20位",
  },
  URL: {
    pattern: /^https?:\/\/.+/,
    message: "请输入有效的URL地址",
  },
} as const

// 通用数据验证函数
export function validateData(
  data: any,
  rules: Record<string, any>,
): {
  isValid: boolean
  errors: Record<string, string[]>
} {
  const errors: Record<string, string[]> = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]
    const fieldErrors: string[] = []

    // 必填验证
    if (rule.required && !validateRequired(value)) {
      fieldErrors.push(`${field}不能为空`)
    }

    // 如果值为空且非必填，跳过其他验证
    if (!value && !rule.required) {
      continue
    }

    // 长度验证
    if (rule.minLength && value.length < rule.minLength) {
      fieldErrors.push(`${field}长度不能少于${rule.minLength}位`)
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      fieldErrors.push(`${field}长度不能超过${rule.maxLength}位`)
    }

    // 正则验证
    if (rule.pattern && !rule.pattern.test(value)) {
      fieldErrors.push(rule.message || `${field}格式不正确`)
    }

    // 自定义验证函数
    if (rule.validator && typeof rule.validator === "function") {
      const customResult = rule.validator(value)
      if (customResult !== true) {
        fieldErrors.push(customResult || `${field}验证失败`)
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

// 批量验证函数
export function validateBatch(
  items: any[],
  rules: Record<string, any>,
): {
  isValid: boolean
  results: Array<{ isValid: boolean; errors: Record<string, string[]> }>
} {
  const results = items.map((item) => validateData(item, rules))
  const isValid = results.every((result) => result.isValid)

  return { isValid, results }
}

// 异步验证函数
export async function validateAsync(
  data: any,
  rules: Record<string, any>,
): Promise<{ isValid: boolean; errors: Record<string, string[]> }> {
  const errors: Record<string, string[]> = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]
    const fieldErrors: string[] = []

    // 同步验证
    const syncResult = validateData({ [field]: value }, { [field]: rule })
    if (!syncResult.isValid) {
      fieldErrors.push(...syncResult.errors[field])
    }

    // 异步验证
    if (rule.asyncValidator && typeof rule.asyncValidator === "function") {
      try {
        const asyncResult = await rule.asyncValidator(value)
        if (asyncResult !== true) {
          fieldErrors.push(asyncResult || `${field}异步验证失败`)
        }
      } catch (error) {
        fieldErrors.push(`${field}验证过程中发生错误`)
      }
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
