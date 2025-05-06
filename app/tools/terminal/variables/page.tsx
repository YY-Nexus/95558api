import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TerminalVariableTable } from "@/components/terminal-variable-table"
import { TerminalCommandCard } from "@/components/terminal-command-card"

// 环境变量数据 / Environment variables data
const environmentVariables = [
  {
    name: "HOME",
    description: "当前用户的主目录", // Current user's home directory
    command: "echo $HOME",
    example: "/home/username",
    usage: "查找用户特定的配置文件或数据", // Find user-specific configuration files or data
  },
  {
    name: "PATH",
    description: "可执行文件搜索路径", // Executable file search path
    command: "echo $PATH",
    example: "/usr/local/bin:/usr/bin:/bin",
    usage: "定位系统命令和程序的位置", // Locate system commands and programs
  },
  {
    name: "USER",
    description: "当前登录用户名", // Current logged-in username
    command: "echo $USER",
    example: "username",
    usage: "在脚本中识别当前用户", // Identify current user in scripts
  },
  {
    name: "PWD",
    description: "当前工作目录", // Current working directory
    command: "echo $PWD",
    example: "/path/to/current/directory",
    usage: "获取脚本执行的当前位置", // Get the current location where the script is executed
  },
  {
    name: "SHELL",
    description: "当前使用的Shell", // Current shell being used
    command: "echo $SHELL",
    example: "/bin/bash",
    usage: "确定脚本的解释器", // Determine the interpreter for scripts
  },
]

// Shell变量数据 / Shell variables data
const shellVariables = [
  {
    name: "$0",
    description: "当前脚本的名称", // Name of the current script
    command: "echo $0",
    example: "./script.sh",
    usage: "在脚本中引用自身名称", // Reference the script's own name within the script
  },
  {
    name: "$1, $2, ...",
    description: "脚本的位置参数", // Positional parameters of the script
    command: "echo $1",
    example: "first_argument",
    usage: "访问脚本的命令行参数", // Access command-line arguments of the script
  },
  {
    name: "$#",
    description: "传递给脚本的参数数量", // Number of arguments passed to the script
    command: "echo $#",
    example: "3",
    usage: "检查提供的参数数量", // Check the number of provided arguments
  },
  {
    name: "$@",
    description: "所有位置参数（作为单独的字符串）", // All positional parameters (as separate strings)
    command: "echo $@",
    example: "arg1 arg2 arg3",
    usage: "遍历所有脚本参数", // Iterate through all script arguments
  },
  {
    name: "$*",
    description: "所有位置参数（作为单个字符串）", // All positional parameters (as a single string)
    command: "echo $*",
    example: "arg1 arg2 arg3",
    usage: "将所有参数作为一个字符串处理", // Process all arguments as a single string
  },
  {
    name: "$$",
    description: "当前Shell的进程ID", // Process ID of the current shell
    command: "echo $$",
    example: "1234",
    usage: "创建唯一的临时文件名", // Create unique temporary filenames
  },
  {
    name: "$?",
    description: "最近一条命令的退出状态", // Exit status of the most recent command
    command: "echo $?",
    example: "0",
    usage: "检查上一个命令是否成功执行", // Check if the previous command executed successfully
  },
  {
    name: "$!",
    description: "最近一个后台进程的PID", // PID of the most recent background process
    command: "echo $!",
    example: "5678",
    usage: "跟踪后台进程", // Track background processes
  },
]

// 变量生成命令 / Variable generation commands
const variableGenerationCommands = [
  {
    title: "生成随机数", // Generate random number
    description: "生成一个随机数", // Generate a random number
    command: "RANDOM_NUMBER=$RANDOM",
    example: "echo $RANDOM_NUMBER # 输出: 12345",
    explanation: "RANDOM是Bash内置变量，每次引用时生成0-32767之间的随机整数", // RANDOM is a Bash built-in variable that generates a random integer between 0-32767 each time it's referenced
  },
  {
    title: "生成UUID", // Generate UUID
    description: "生成通用唯一标识符", // Generate a universally unique identifier
    command: "UUID=$(uuidgen)",
    example: "echo $UUID # 输出: 123e4567-e89b-12d3-a456-426614174000",
    explanation: "uuidgen命令生成符合RFC 4122标准的UUID，常用于创建唯一标识符", // The uuidgen command generates a UUID compliant with RFC 4122, commonly used to create unique identifiers
  },
  {
    title: "生成时间戳", // Generate timestamp
    description: "生成当前的Unix时间戳", // Generate the current Unix timestamp
    command: "TIMESTAMP=$(date +%s)",
    example: "echo $TIMESTAMP # 输出: 1620000000",
    explanation: "date命令的+%s格式输出自1970年1月1日以来的秒数，常用于文件名和日志", // The +%s format of the date command outputs the number of seconds since January 1, 1970, commonly used for filenames and logs
  },
  {
    title: "生成日期格式字符串", // Generate formatted date string
    description: "生成格式化的日期字符串", // Generate a formatted date string
    command: 'DATE_STRING=$(date +"%Y-%m-%d_%H-%M-%S")',
    example: "echo $DATE_STRING # 输出: 2023-05-15_10-30-45",
    explanation: "使用date命令格式化当前日期和时间，常用于创建带时间戳的文件名", // Use the date command to format the current date and time, commonly used to create timestamped filenames
  },
  {
    title: "生成随机字符串", // Generate random string
    description: "生成指定长度的随机字符串", // Generate a random string of specified length
    command: "RANDOM_STRING=$(openssl rand -base64 12)",
    example: "echo $RANDOM_STRING # 输出: a1b2c3d4e5f6",
    explanation: "使用openssl生成随机字节并转换为base64编码，常用于临时密码或令牌", // Use openssl to generate random bytes and convert to base64 encoding, commonly used for temporary passwords or tokens
  },
  {
    title: "从文件生成变量", // Generate variable from file
    description: "从文件内容创建变量", // Create a variable from file content
    command: "FILE_CONTENT=$(cat filename.txt)",
    example: "echo $FILE_CONTENT # 输出文件内容",
    explanation: "使用命令替换将文件内容存储到变量中，适用于处理配置文件或数据文件", // Use command substitution to store file content in a variable, suitable for processing configuration or data files
  },
  {
    title: "从命令输出生成变量", // Generate variable from command output
    description: "捕获命令输出到变量", // Capture command output to a variable
    command: "DISK_USAGE=$(df -h | grep '/$' | awk '{print $5}')",
    example: "echo $DISK_USAGE # 输出: 45%",
    explanation: "使用命令管道和awk处理命令输出，常用于系统监控和自动化脚本", // Use command pipeline and awk to process command output, commonly used in system monitoring and automation scripts
  },
  {
    title: "生成递增序列", // Generate incremental sequence
    description: "生成一个数字序列", // Generate a number sequence
    command: "for i in {1..5}; do echo $i; done",
    example: "# 输出: 1 2 3 4 5",
    explanation: "使用Bash的大括号扩展生成序列，适用于循环和批处理操作", // Use Bash's brace expansion to generate sequences, suitable for loops and batch operations
  },
]

export default function TerminalVariablesPage() {
  return (
    <div className="container py-8 space-y-8">
      {/* 页面标题 / Page title */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">终端变量命令</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用终端变量的释义、生成方法和使用场景</p>
      </div>

      {/* 标签页导航 / Tab navigation */}
      <Tabs defaultValue="env-vars" className="w-full">
        <TabsList className="w-full justify-start mb-4 bg-muted/50 p-1 rounded-lg">
          <TabsTrigger
            value="env-vars"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            环境变量
          </TabsTrigger>
          <TabsTrigger
            value="shell-vars"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            Shell变量
          </TabsTrigger>
          <TabsTrigger
            value="var-gen"
            className="data-[state=active]:bg-white data-[state=active]:text-blue-accent-700"
          >
            变量生成命令
          </TabsTrigger>
        </TabsList>

        {/* 环境变量标签页内容 / Environment variables tab content */}
        <TabsContent value="env-vars" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>环境变量</CardTitle>
              <CardDescription>系统预定义的环境变量及其用途</CardDescription>
            </CardHeader>
            <CardContent>
              <TerminalVariableTable variables={environmentVariables} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shell变量标签页内容 / Shell variables tab content */}
        <TabsContent value="shell-vars" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Shell变量</CardTitle>
              <CardDescription>Shell脚本中的特殊变量及其含义</CardDescription>
            </CardHeader>
            <CardContent>
              <TerminalVariableTable variables={shellVariables} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* 变量生成命令标签页内容 / Variable generation commands tab content */}
        <TabsContent value="var-gen" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {variableGenerationCommands.map((command, index) => (
              <TerminalCommandCard key={index} command={command} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
