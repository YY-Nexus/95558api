import { Database, HardDrive, Cloud, Server } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function StorageApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">存储与数据库 API</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用存储与数据库API集成代码和示例</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>MySQL</CardTitle>
              <CardDescription>MySQL数据库集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              MySQL是世界上最流行的开源关系型数据库管理系统，广泛应用于Web应用程序。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/mysql" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>MongoDB</CardTitle>
              <CardDescription>MongoDB数据库集成</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              MongoDB是一个基于文档的分布式数据库，专为现代应用开发者和云时代而设计。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/mongodb" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>阿里云OSS</CardTitle>
              <CardDescription>阿里云对象存储服务</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              阿里云对象存储服务（OSS）是一种海量、安全、低成本、高可靠的云存储服务。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/aliyun-oss" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Cloud className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>AWS S3</CardTitle>
              <CardDescription>Amazon S3存储服务</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Amazon S3是一种对象存储服务，提供行业领先的可扩展性、数据可用性、安全性和性能。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/aws-s3" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <HardDrive className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Redis</CardTitle>
              <CardDescription>Redis缓存服务</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Redis是一个开源的内存数据结构存储，用作数据库、缓存和消息代理。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/redis" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Firebase</CardTitle>
              <CardDescription>Firebase实时数据库</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Firebase是Google的移动平台，可帮助您快速开发高质量的应用程序并发展业务。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/storage/firebase" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
