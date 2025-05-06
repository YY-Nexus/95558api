import { Map, Navigation, MapPin, Compass } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MapApiPage() {
  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-blue-accent-800">地图与位置 API</h1>
        <p className="text-muted-foreground mt-2">启智云枢³ 常用地图与位置API集成代码和示例</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Map className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>高德地图</CardTitle>
              <CardDescription>高德地图JavaScript API</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              高德地图JavaScript API提供了丰富的地图功能，包括地图显示、标记、路线规划等。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/amap" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Map className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>百度地图</CardTitle>
              <CardDescription>百度地图JavaScript API</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              百度地图JavaScript API提供了丰富的地图功能，包括地图显示、标记、路线规划等。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/baidu" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Map className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>Google Maps</CardTitle>
              <CardDescription>Google Maps JavaScript API</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Google Maps JavaScript API提供了全球范围内的地图功能，包括地图显示、标记、路线规划等。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/google" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>导航服务</CardTitle>
              <CardDescription>路线规划与导航</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              提供路线规划和导航服务，支持驾车、步行、公交等多种出行方式。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/navigation" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>地理编码</CardTitle>
              <CardDescription>地址与坐标转换</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              提供地址与坐标之间的转换服务，支持正向地理编码和反向地理编码。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/geocoding" className="w-full">
              <Button className="w-full" variant="outline">
                查看详情
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-3 flex flex-row items-center gap-2">
            <div className="rounded-full p-2 bg-blue-accent-50 text-blue-accent-600">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <CardTitle>位置服务</CardTitle>
              <CardDescription>定位与位置追踪</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              提供用户定位和位置追踪服务，支持GPS、IP、基站等多种定位方式。
            </p>
          </CardContent>
          <CardFooter className="pt-3 border-t bg-muted/50">
            <Link href="/api/map/location" className="w-full">
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
