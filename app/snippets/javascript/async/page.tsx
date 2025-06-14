import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function JavaScriptAsyncPage() {
  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">JavaScript 异步编程</h1>
        <p className="text-muted-foreground mt-2">Promise、async/await、异步模式的完整指南</p>
      </div>

      <Tabs defaultValue="promises" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="promises">Promise基础</TabsTrigger>
          <TabsTrigger value="async-await">Async/Await</TabsTrigger>
          <TabsTrigger value="patterns">异步模式</TabsTrigger>
          <TabsTrigger value="error-handling">错误处理</TabsTrigger>
          <TabsTrigger value="performance">性能优化</TabsTrigger>
        </TabsList>

        <TabsContent value="promises" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Promise 基础语法</CardTitle>
                <CardDescription>Promise的创建和使用</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 创建Promise
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = Math.random() > 0.5;
    
    if (success) {
      resolve('操作成功！');
    } else {
      reject(new Error('操作失败！'));
    }
  }, 1000);
});

// 使用Promise
myPromise
  .then(result => {
    console.log('成功:', result);
  })
  .catch(error => {
    console.error('失败:', error.message);
  })
  .finally(() => {
    console.log('操作完成');
  });

// Promise状态
// pending: 初始状态
// fulfilled: 操作成功
// rejected: 操作失败`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promise 链式调用</CardTitle>
                <CardDescription>多个异步操作的串联</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 链式调用示例
function fetchUser(id) {
  return fetch('/api/users/' + id)
    .then(response => {
      if (!response.ok) {
        throw new Error('用户不存在');
      }
      return response.json();
    });
}

function fetchUserPosts(userId) {
  return fetch('/api/users/' + userId + '/posts')
    .then(response => response.json());
}

// 串联多个异步操作
fetchUser(123)
  .then(user => {
    console.log('用户信息:', user);
    return fetchUserPosts(user.id);
  })
  .then(posts => {
    console.log('用户文章:', posts);
    return posts.length;
  })
  .then(postCount => {
    console.log('文章数量:', postCount);
  })
  .catch(error => {
    console.error('错误:', error.message);
  });`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promise.all() 并发执行</CardTitle>
                <CardDescription>同时执行多个异步操作</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 并发执行多个Promise
const promise1 = fetch('/api/data1');
const promise2 = fetch('/api/data2');
const promise3 = fetch('/api/data3');

Promise.all([promise1, promise2, promise3])
  .then(responses => {
    // 所有请求都成功时执行
    console.log('所有请求完成');
    return Promise.all(
      responses.map(response => response.json())
    );
  })
  .then(data => {
    console.log('所有数据:', data);
  })
  .catch(error => {
    // 任何一个请求失败都会执行
    console.error('有请求失败:', error);
  });

// 实际应用示例
async function loadDashboardData() {
  try {
    const [user, posts, notifications] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchNotifications()
    ]);
    
    return {
      user,
      posts,
      notifications
    };
  } catch (error) {
    console.error('加载仪表板数据失败:', error);
    throw error;
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Promise 其他方法</CardTitle>
                <CardDescription>allSettled、race、any等方法</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// Promise.allSettled() - 等待所有Promise完成
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        console.log('Promise ' + index + ' 成功:', result.value);
      } else {
        console.log('Promise ' + index + ' 失败:', result.reason);
      }
    });
  });

// Promise.race() - 返回最先完成的Promise
Promise.race([
  fetch('/api/fast'),
  fetch('/api/slow'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('超时')), 5000)
  )
])
.then(result => {
  console.log('最快的结果:', result);
})
.catch(error => {
  console.error('最快的错误:', error);
});

// Promise.any() - 返回第一个成功的Promise
Promise.any([promise1, promise2, promise3])
  .then(result => {
    console.log('第一个成功的结果:', result);
  })
  .catch(error => {
    // 所有Promise都失败时执行
    console.error('所有Promise都失败了:', error);
  });`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="async-await" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Async/Await 基础</CardTitle>
                <CardDescription>现代异步编程语法</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 基础async/await语法
async function fetchUserData(userId) {
  try {
    // await会暂停函数执行，等待Promise完成
    const response = await fetch('/api/users/' + userId);
    
    if (!response.ok) {
      throw new Error('HTTP error! status: ' + response.status);
    }
    
    const user = await response.json();
    console.log('用户数据:', user);
    
    return user;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error; // 重新抛出错误
  }
}

// 调用async函数
fetchUserData(123)
  .then(user => {
    console.log('成功获取用户:', user);
  })
  .catch(error => {
    console.error('处理失败:', error);
  });

// 或者在另一个async函数中调用
async function handleUser() {
  try {
    const user = await fetchUserData(123);
    console.log('处理用户:', user);
  } catch (error) {
    console.error('处理用户失败:', error);
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>串行 vs 并行执行</CardTitle>
                <CardDescription>控制异步操作的执行顺序</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 串行执行（按顺序执行）
async function serialExecution() {
  console.time('串行执行');
  
  const result1 = await fetch('/api/data1');
  const data1 = await result1.json();
  
  const result2 = await fetch('/api/data2');
  const data2 = await result2.json();
  
  const result3 = await fetch('/api/data3');
  const data3 = await result3.json();
  
  console.timeEnd('串行执行'); // 约3秒
  return [data1, data2, data3];
}

// 并行执行（同时执行）
async function parallelExecution() {
  console.time('并行执行');
  
  // 同时发起所有请求
  const [result1, result2, result3] = await Promise.all([
    fetch('/api/data1'),
    fetch('/api/data2'),
    fetch('/api/data3')
  ]);
  
  // 同时解析所有响应
  const [data1, data2, data3] = await Promise.all([
    result1.json(),
    result2.json(),
    result3.json()
  ]);
  
  console.timeEnd('并行执行'); // 约1秒
  return [data1, data2, data3];
}

// 混合执行（部分串行，部分并行）
async function mixedExecution() {
  // 先获取用户信息
  const user = await fetchUser();
  
  // 然后并行获取用户相关数据
  const [posts, comments, likes] = await Promise.all([
    fetchUserPosts(user.id),
    fetchUserComments(user.id),
    fetchUserLikes(user.id)
  ]);
  
  return { user, posts, comments, likes };
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>循环中的异步操作</CardTitle>
                <CardDescription>在循环中正确使用async/await</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 错误的方式 - forEach不会等待
const userIds = [1, 2, 3, 4, 5];

// ❌ 这样不会等待异步操作完成
userIds.forEach(async (id) => {
  const user = await fetchUser(id);
  console.log(user);
});

// ✅ 正确的串行处理
async function processUsersSerially() {
  for (const id of userIds) {
    const user = await fetchUser(id);
    console.log(user);
  }
}

// ✅ 正确的并行处理
async function processUsersParallel() {
  const users = await Promise.all(
    userIds.map(id => fetchUser(id))
  );
  users.forEach(user => console.log(user));
}

// ✅ 使用for...of循环
async function processUsersWithForOf() {
  for (const id of userIds) {
    try {
      const user = await fetchUser(id);
      console.log('处理用户:', user);
    } catch (error) {
      console.error('处理用户 ' + id + ' 失败:', error);
    }
  }
}

// ✅ 批量处理（控制并发数量）
async function processBatch(items, batchSize = 3) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const results = await Promise.all(
      batch.map(item => processItem(item))
    );
    console.log('批次 ' + (Math.floor(i / batchSize) + 1) + ' 完成:', results);
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>条件异步操作</CardTitle>
                <CardDescription>根据条件执行不同的异步操作</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 条件异步执行
async function conditionalAsync(userType) {
  let userData;
  
  if (userType === 'admin') {
    userData = await fetchAdminData();
  } else if (userType === 'premium') {
    userData = await fetchPremiumData();
  } else {
    userData = await fetchBasicData();
  }
  
  return userData;
}

// 使用三元运算符
async function fetchUserProfile(userId, includePrivate = false) {
  const profile = await fetchBasicProfile(userId);
  
  const privateData = includePrivate 
    ? await fetchPrivateData(userId)
    : null;
  
  return {
    ...profile,
    private: privateData
  };
}

// 可选链式异步调用
async function safeAsyncCall(user) {
  // 只有当user存在且有id时才执行异步操作
  const posts = user?.id 
    ? await fetchUserPosts(user.id)
    : [];
  
  return posts;
}

// 重试机制
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      }
      throw new Error('HTTP ' + response.status);
    } catch (error) {
      console.log('尝试 ' + (i + 1) + ' 失败:', error.message);
      
      if (i === maxRetries - 1) {
        throw error; // 最后一次尝试失败，抛出错误
      }
      
      // 等待一段时间后重试
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * (i + 1))
      );
    }
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>异步队列模式</CardTitle>
                <CardDescription>控制异步操作的执行顺序</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 异步队列类
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }
  
  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        asyncFunction,
        resolve,
        reject
      });
      
      this.process();
    });
  }
  
  async process() {
    if (this.running || this.queue.length === 0) {
      return;
    }
    
    this.running = true;
    
    while (this.queue.length > 0) {
      const { asyncFunction, resolve, reject } = this.queue.shift();
      
      try {
        const result = await asyncFunction();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    
    this.running = false;
  }
}

// 使用示例
const queue = new AsyncQueue();

// 添加任务到队列
queue.add(() => fetchUser(1))
  .then(user => console.log('用户1:', user));

queue.add(() => fetchUser(2))
  .then(user => console.log('用户2:', user));

queue.add(() => fetchUser(3))
  .then(user => console.log('用户3:', user));`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>并发限制模式</CardTitle>
                <CardDescription>限制同时执行的异步操作数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 并发限制函数
async function limitConcurrency(tasks, limit = 3) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

// 使用示例
const tasks = [
  () => fetch('/api/data1').then(r => r.json()),
  () => fetch('/api/data2').then(r => r.json()),
  () => fetch('/api/data3').then(r => r.json()),
  () => fetch('/api/data4').then(r => r.json()),
  () => fetch('/api/data5').then(r => r.json()),
];

limitConcurrency(tasks, 2)
  .then(results => {
    console.log('所有任务完成:', results);
  });

// 更高级的并发控制类
class ConcurrencyLimiter {
  constructor(limit = 3) {
    this.limit = limit;
    this.running = 0;
    this.queue = [];
  }
  
  async add(asyncFunction) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        asyncFunction,
        resolve,
        reject
      });
      
      this.process();
    });
  }
  
  async process() {
    if (this.running >= this.limit || this.queue.length === 0) {
      return;
    }
    
    this.running++;
    const { asyncFunction, resolve, reject } = this.queue.shift();
    
    try {
      const result = await asyncFunction();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.process(); // 处理队列中的下一个任务
    }
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>缓存模式</CardTitle>
                <CardDescription>缓存异步操作的结果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 简单缓存
const cache = new Map();

async function cachedFetch(url) {
  if (cache.has(url)) {
    console.log('从缓存返回:', url);
    return cache.get(url);
  }
  
  console.log('发起请求:', url);
  const response = await fetch(url);
  const data = await response.json();
  
  cache.set(url, data);
  return data;
}

// 带过期时间的缓存
class TimedCache {
  constructor(ttl = 5 * 60 * 1000) { // 默认5分钟
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  set(key, value) {
    const expiry = Date.now() + this.ttl;
    this.cache.set(key, { value, expiry });
  }
  
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      return null;
    }
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }
  
  has(key) {
    return this.get(key) !== null;
  }
}

const timedCache = new TimedCache(10 * 60 * 1000); // 10分钟

async function cachedApiCall(endpoint) {
  if (timedCache.has(endpoint)) {
    return timedCache.get(endpoint);
  }
  
  const response = await fetch(endpoint);
  const data = await response.json();
  
  timedCache.set(endpoint, data);
  return data;
}

// Promise缓存（避免重复请求）
const promiseCache = new Map();

async function singletonFetch(url) {
  if (promiseCache.has(url)) {
    console.log('返回正在进行的请求:', url);
    return promiseCache.get(url);
  }
  
  const promise = fetch(url)
    .then(response => response.json())
    .finally(() => {
      // 请求完成后清除缓存
      promiseCache.delete(url);
    });
  
  promiseCache.set(url, promise);
  return promise;
}

// 使用示例
// 即使同时调用多次，也只会发起一个请求
singletonFetch('/api/user/123');
singletonFetch('/api/user/123');
singletonFetch('/api/user/123');`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>观察者模式</CardTitle>
                <CardDescription>异步事件的发布订阅</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 异步事件发射器
class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
  }
  
  off(event, callback) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
  
  async emit(event, data) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event);
      
      // 并行执行所有回调
      await Promise.all(
        callbacks.map(callback => callback(data))
      );
    }
  }
  
  once(event, callback) {
    const onceCallback = async (data) => {
      this.off(event, onceCallback);
      return callback(data);
    };
    this.on(event, onceCallback);
  }
}

// 使用示例
const emitter = new AsyncEventEmitter();

// 注册事件监听器
emitter.on('userLogin', async (user) => {
  console.log('用户登录:', user);
  await updateUserStatus(user.id, 'online');
});

emitter.on('userLogin', async (user) => {
  console.log('记录登录日志:', user);
  await logUserActivity(user.id, 'login');
});

// 触发事件
async function handleLogin(user) {
  await emitter.emit('userLogin', user);
  console.log('所有登录处理完成');
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="error-handling" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>错误处理最佳实践</CardTitle>
                <CardDescription>异步操作中的错误处理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 基础错误处理
async function safeAsyncOperation() {
  try {
    const result = await riskyOperation();
    return result;
  } catch (error) {
    console.error('操作失败:', error.message);
    
    // 根据错误类型进行不同处理
    if (error.name === 'NetworkError') {
      throw new Error('网络连接失败，请检查网络');
    } else if (error.name === 'ValidationError') {
      throw new Error('数据验证失败');
    } else {
      throw new Error('未知错误，请稍后重试');
    }
  }
}

// 自定义错误类
class APIError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
  }
}

class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

// 带错误分类的请求函数
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        errorData.message || '请求失败',
        response.status,
        errorData.code
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    } else if (error.name === 'TypeError') {
      throw new NetworkError('网络连接失败');
    } else {
      throw new Error('请求处理失败');
    }
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>错误恢复策略</CardTitle>
                <CardDescription>自动重试和降级处理</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 指数退避重试
async function retryWithBackoff(
  asyncFn, 
  maxRetries = 3, 
  baseDelay = 1000
) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // 指数退避：1s, 2s, 4s, 8s...
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log('第 ' + attempt + ' 次尝试失败，' + delay + 'ms后重试');
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

// 带条件的重试
async function smartRetry(asyncFn, shouldRetry, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await asyncFn();
    } catch (error) {
      if (attempt === maxRetries || !shouldRetry(error)) {
        throw error;
      }
      
      console.log('重试第 ' + attempt + ' 次:', error.message);
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}

// 使用示例
const result = await smartRetry(
  () => fetch('/api/data').then(r => r.json()),
  (error) => {
    // 只有网络错误或5xx错误才重试
    return error.name === 'NetworkError' || 
           (error.status >= 500 && error.status < 600);
  },
  3
);

// 降级处理
async function fetchWithFallback(primaryUrl, fallbackUrl) {
  try {
    return await fetch(primaryUrl).then(r => r.json());
  } catch (primaryError) {
    console.warn('主要数据源失败，使用备用数据源');
    
    try {
      return await fetch(fallbackUrl).then(r => r.json());
    } catch (fallbackError) {
      console.error('所有数据源都失败了');
      
      // 返回默认数据或缓存数据
      return getDefaultData();
    }
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>超时处理</CardTitle>
                <CardDescription>为异步操作设置超时</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 基础超时函数
function withTimeout(promise, timeoutMs) {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('操作超时 (' + timeoutMs + 'ms)'));
    }, timeoutMs);
  });
  
  return Promise.race([promise, timeout]);
}

// 使用示例
try {
  const result = await withTimeout(
    fetch('/api/slow-endpoint'),
    5000 // 5秒超时
  );
  console.log('请求成功:', result);
} catch (error) {
  if (error.message.includes('超时')) {
    console.error('请求超时');
  } else {
    console.error('请求失败:', error);
  }
}

// 可取消的超时
class TimeoutController {
  constructor(timeoutMs) {
    this.timeoutMs = timeoutMs;
    this.timeoutId = null;
    this.promise = null;
  }
  
  wrap(promise) {
    this.promise = new Promise((resolve, reject) => {
      this.timeoutId = setTimeout(() => {
        reject(new Error('操作超时 (' + this.timeoutMs + 'ms)'));
      }, this.timeoutMs);
      
      promise
        .then(resolve)
        .catch(reject)
        .finally(() => {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
          }
        });
    });
    
    return this.promise;
  }
  
  cancel() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}

// 使用可取消超时
const controller = new TimeoutController(5000);
const request = controller.wrap(fetch('/api/data'));

// 如果需要，可以取消超时
// controller.cancel();

try {
  const result = await request;
  console.log('成功:', result);
} catch (error) {
  console.error('失败:', error);
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>错误边界模式</CardTitle>
                <CardDescription>隔离错误影响范围</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 错误隔离函数
async function isolateError(asyncFn, fallback = null) {
  try {
    return await asyncFn();
  } catch (error) {
    console.error('隔离的错误:', error);
    return fallback;
  }
}

// 批量操作的错误隔离
async function processItemsSafely(items, processor) {
  const results = [];
  
  for (const item of items) {
    const result = await isolateError(
      () => processor(item),
      { error: true, item }
    );
    results.push(result);
  }
  
  return results;
}

// 使用示例
const items = [1, 2, 3, 4, 5];
const results = await processItemsSafely(items, async (item) => {
  if (item === 3) {
    throw new Error('处理失败');
  }
  return { success: true, value: item * 2 };
});

console.log(results);
// [
//   { success: true, value: 2 },
//   { success: true, value: 4 },
//   { error: true, item: 3 },
//   { success: true, value: 8 },
//   { success: true, value: 10 }
// ]

// 电路断路器模式
class CircuitBreaker {
  constructor(threshold = 5, timeout = 60000) {
    this.threshold = threshold;
    this.timeout = timeout;
    this.failureCount = 0;
    this.lastFailureTime = null;
    this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
  }
  
  async call(asyncFn) {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'HALF_OPEN';
      } else {
        throw new Error('电路断路器开启，拒绝请求');
      }
    }
    
    try {
      const result = await asyncFn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  onSuccess() {
    this.failureCount = 0;
    this.state = 'CLOSED';
  }
  
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    
    if (this.failureCount >= this.threshold) {
      this.state = 'OPEN';
    }
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>性能优化技巧</CardTitle>
                <CardDescription>提升异步操作性能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 预加载和懒加载
class DataLoader {
  constructor() {
    this.cache = new Map();
    this.loading = new Map();
  }
  
  // 预加载数据
  async preload(keys) {
    const promises = keys.map(key => this.load(key));
    await Promise.all(promises);
  }
  
  // 懒加载数据
  async load(key) {
    // 如果已缓存，直接返回
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // 如果正在加载，返回正在进行的Promise
    if (this.loading.has(key)) {
      return this.loading.get(key);
    }
    
    // 开始加载
    const promise = this.fetchData(key)
      .then(data => {
        this.cache.set(key, data);
        this.loading.delete(key);
        return data;
      })
      .catch(error => {
        this.loading.delete(key);
        throw error;
      });
    
    this.loading.set(key, promise);
    return promise;
  }
  
  async fetchData(key) {
    const response = await fetch('/api/data/' + key);
    return response.json();
  }
}

// 使用示例
const loader = new DataLoader();

// 预加载常用数据
await loader.preload(['user', 'settings', 'notifications']);

// 懒加载其他数据
const userData = await loader.load('user');

// 批量数据加载
async function loadUserDashboard(userId) {
  // 并行加载所有需要的数据
  const [user, posts, notifications, settings] = await Promise.all([
    loader.load('user-' + userId),
    loader.load('posts-' + userId),
    loader.load('notifications-' + userId),
    loader.load('settings-' + userId)
  ]);
  
  return { user, posts, notifications, settings };
}`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>内存管理</CardTitle>
                <CardDescription>避免内存泄漏</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 清理资源的异步操作
class ResourceManager {
  constructor() {
    this.resources = new Set();
    this.cleanupTasks = new Set();
  }
  
  async createResource(factory) {
    const resource = await factory();
    this.resources.add(resource);
    
    // 返回带清理功能的资源
    return {
      ...resource,
      cleanup: () => this.cleanup(resource)
    };
  }
  
  cleanup(resource) {
    this.resources.delete(resource);
    
    // 执行资源特定的清理
    if (resource.close) {
      resource.close();
    }
    if (resource.destroy) {
      resource.destroy();
    }
  }
  
  async cleanupAll() {
    const cleanupPromises = Array.from(this.resources).map(
      resource => this.cleanup(resource)
    );
    
    await Promise.all(cleanupPromises);
    this.resources.clear();
  }
  
  // 注册清理任务
  onCleanup(task) {
    this.cleanupTasks.add(task);
  }
  
  async dispose() {
    // 执行所有清理任务
    await Promise.all(
      Array.from(this.cleanupTasks).map(task => task())
    );
    
    await this.cleanupAll();
    this.cleanupTasks.clear();
  }
}

// 使用示例
const manager = new ResourceManager();

// 创建需要清理的资源
const connection = await manager.createResource(async () => {
  const conn = await createDatabaseConnection();
  return conn;
});

// 注册清理任务
manager.onCleanup(async () => {
  console.log('执行清理任务');
  await saveState();
});

// 在适当时机清理资源
window.addEventListener('beforeunload', () => {
  manager.dispose();
});

// WeakMap用于避免内存泄漏
const asyncOperations = new WeakMap();

function attachAsyncOperation(element, operation) {
  asyncOperations.set(element, operation);
}

function getAsyncOperation(element) {
  return asyncOperations.get(element);
}

// 当element被垃圾回收时，相关的异步操作也会被清理`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能监控</CardTitle>
                <CardDescription>监控异步操作性能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 性能监控装饰器
function performanceMonitor(name) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function(...args) {
      const startTime = performance.now();
      const startMemory = performance.memory?.usedJSHeapSize || 0;
      
      try {
        const result = await originalMethod.apply(this, args);
        
        const endTime = performance.now();
        const endMemory = performance.memory?.usedJSHeapSize || 0;
        
        console.log(name + ' 性能统计:', {
          duration: (endTime - startTime).toFixed(2) + 'ms',
          memoryDelta: ((endMemory - startMemory) / 1024 / 1024).toFixed(2) + 'MB'
        });
        
        return result;
      } catch (error) {
        const endTime = performance.now();
        console.error(name + ' 执行失败 (' + (endTime - startTime).toFixed(2) + 'ms):', error);
        throw error;
      }
    };
    
    return descriptor;
  };
}

// 使用装饰器
class DataService {
  @performanceMonitor('fetchUserData')
  async fetchUserData(userId) {
    const response = await fetch('/api/users/' + userId);
    return response.json();
  }
  
  @performanceMonitor('processLargeDataset')
  async processLargeDataset(data) {
    // 处理大量数据
    return data.map(item => processItem(item));
  }
}

// 手动性能监控
async function monitoredAsyncOperation(name, asyncFn) {
  const mark = name + '-start';
  const measure = name + '-duration';
  
  performance.mark(mark);
  
  try {
    const result = await asyncFn();
    
    performance.measure(measure, mark);
    const measurement = performance.getEntriesByName(measure)[0];
    
    console.log(name + ' 耗时: ' + measurement.duration.toFixed(2) + 'ms');
    
    // 清理性能标记
    performance.clearMarks(mark);
    performance.clearMeasures(measure);
    
    return result;
  } catch (error) {
    performance.clearMarks(mark);
    throw error;
  }
}

// 使用示例
const result = await monitoredAsyncOperation(
  'loadDashboard',
  () => loadUserDashboard(123)
);`}</pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>批处理优化</CardTitle>
                <CardDescription>批量处理提升性能</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-sm font-mono overflow-x-auto">
                  <pre>{`// 请求批处理器
class RequestBatcher {
  constructor(batchSize = 10, delay = 100) {
    this.batchSize = batchSize;
    this.delay = delay;
    this.queue = [];
    this.timeoutId = null;
  }
  
  async add(request) {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      
      if (this.queue.length >= this.batchSize) {
        this.flush();
      } else if (!this.timeoutId) {
        this.timeoutId = setTimeout(() => this.flush(), this.delay);
      }
    });
  }
  
  async flush() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0);
    
    try {
      const requests = batch.map(item => item.request);
      const results = await this.processBatch(requests);
      
      batch.forEach((item, index) => {
        item.resolve(results[index]);
      });
    } catch (error) {
      batch.forEach(item => {
        item.reject(error);
      });
    }
  }
  
  async processBatch(requests) {
    // 发送批量请求
    const response = await fetch('/api/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests })
    });
    
    return response.json();
  }
}

// 使用批处理器
const batcher = new RequestBatcher(5, 50);

// 多个请求会被自动批处理
const user1 = await batcher.add({ type: 'user', id: 1 });
const user2 = await batcher.add({ type: 'user', id: 2 });
const user3 = await batcher.add({ type: 'user', id: 3 });

// 数据加载器模式
class DataLoader {
  constructor(batchLoadFn, options = {}) {
    this.batchLoadFn = batchLoadFn;
    this.maxBatchSize = options.maxBatchSize || 100;
    this.cache = new Map();
    this.batch = [];
    this.resolvers = [];
  }
  
  async load(key) {
    // 检查缓存
    if (this.cache.has(key)) {
      return this.cache.get(key);
    }
    
    // 添加到批次
    return new Promise((resolve, reject) => {
      this.batch.push(key);
      this.resolvers.push({ resolve, reject });
      
      // 下一个事件循环中处理批次
      process.nextTick(() => this.processBatch());
    });
  }
  
  async processBatch() {
    if (this.batch.length === 0) return;
    
    const batch = this.batch.splice(0);
    const resolvers = this.resolvers.splice(0);
    
    try {
      const results = await this.batchLoadFn(batch);
      
      batch.forEach((key, index) => {
        const result = results[index];
        this.cache.set(key, result);
        resolvers[index].resolve(result);
      });
    } catch (error) {
      resolvers.forEach(resolver => {
        resolver.reject(error);
      });
    }
  }
}

// 使用数据加载器
const userLoader = new DataLoader(async (userIds) => {
  const response = await fetch('/api/users/batch', {
    method: 'POST',
    body: JSON.stringify({ ids: userIds })
  });
  return response.json();
});

// 这些请求会被批处理
const user1 = await userLoader.load(1);
const user2 = await userLoader.load(2);
const user3 = await userLoader.load(3);`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
