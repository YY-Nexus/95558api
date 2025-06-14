"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface RatingProps {
  contentId: string
  contentType: "article" | "snippet" | "api" | "tool"
  initialRating?: number
  initialRatingsCount?: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export function RatingSystem({
  contentId,
  contentType,
  initialRating = 0,
  initialRatingsCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
}: RatingProps) {
  const [userRating, setUserRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [hasRated, setHasRated] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showRatingDetails, setShowRatingDetails] = useState(false)
  const [ratingsCount, setRatingsCount] = useState(initialRatingsCount)

  const totalRatings = Object.values(ratingsCount).reduce((sum, count) => sum + count, 0)
  const averageRating =
    totalRatings > 0
      ? (
          Object.entries(ratingsCount).reduce((sum, [rating, count]) => sum + Number(rating) * count, 0) / totalRatings
        ).toFixed(1)
      : "0.0"

  const handleRatingSubmit = async () => {
    if (userRating === 0) return

    setIsSubmitting(true)

    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 500))

      // 更新评分统计
      setRatingsCount((prev) => ({
        ...prev,
        [userRating]: prev[userRating as keyof typeof prev] + 1,
      }))

      setHasRated(true)
    } catch (error) {
      console.error("提交评分失败", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPercentage = (count: number) => {
    return totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">用户评分</CardTitle>
        <CardDescription>
          {totalRatings > 0 ? `${averageRating} 分 · ${totalRatings} 人评分` : "暂无评分"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasRated ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  className="p-1"
                  onMouseEnter={() => setHoveredRating(rating)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setUserRating(rating)}
                >
                  <Star
                    className={`h-8 w-8 ${
                      rating <= (hoveredRating || userRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            <div className="text-center text-sm">
              {hoveredRating > 0 && (
                <span className="font-medium">
                  {hoveredRating === 1
                    ? "很差"
                    : hoveredRating === 2
                      ? "较差"
                      : hoveredRating === 3
                        ? "一般"
                        : hoveredRating === 4
                          ? "不错"
                          : "很棒"}
                </span>
              )}
              {userRating > 0 && hoveredRating === 0 && (
                <span className="font-medium">
                  您的评分: {userRating}{" "}
                  {userRating === 1
                    ? "很差"
                    : userRating === 2
                      ? "较差"
                      : userRating === 3
                        ? "一般"
                        : userRating === 4
                          ? "不错"
                          : "很棒"}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="font-medium">感谢您的评分!</p>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-6 w-6 ${
                    rating <= userRating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        <Button variant="link" className="text-xs w-full mt-2" onClick={() => setShowRatingDetails(!showRatingDetails)}>
          {showRatingDetails ? "隐藏详情" : "查看评分详情"}
        </Button>

        {showRatingDetails && (
          <div className="space-y-2 mt-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center w-12">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={getPercentage(ratingsCount[rating as keyof typeof ratingsCount])} className="h-2" />
                <span className="text-xs w-8 text-right">
                  {getPercentage(ratingsCount[rating as keyof typeof ratingsCount])}%
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      {!hasRated && (
        <CardFooter className="pt-0">
          <Button className="w-full" onClick={handleRatingSubmit} disabled={userRating === 0 || isSubmitting}>
            {isSubmitting ? "提交中..." : "提交评分"}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
