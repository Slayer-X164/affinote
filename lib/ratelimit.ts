import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!
})

export const createInstanceLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m")
})

export const paymentLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m")
})

export const contactLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m")
})

export const imageKitLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "1 m")
})