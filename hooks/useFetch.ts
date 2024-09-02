import { useEffect, useState } from "react"

interface FetchCall<T> {
  GET: (params?: any) => Promise<T>
  params?: any
}

interface Props<T> {
  refresh?: boolean
  GET?: (params?: any) => Promise<T>
  params?: any
  dependencies?: any[]
  multiFetch?: FetchCall<T>[]
  defaultValue?: any
}

const useFetch = <T = any>({
  refresh: _refresh,
  GET,
  params,
  multiFetch,
  dependencies = [],
  defaultValue,
}: Props<T>) => {
  const [data, setData] = useState<T | null>(defaultValue ?? null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  const getData = async () => {
    setLoading(true)
    setError(null)

    if (multiFetch) {
      try {
        const results = await Promise.all(
          multiFetch.map(({ GET, params }) => GET(params))
        )

        setData(results as unknown as T)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    } else if (GET) {
      GET(params)
        .then((res: T) => {
          console.log(res, "ressss")

          // @ts-ignore
          if (res?.status === false) return setError(true)

          setData(res)
          setError(false)
        })
        .catch((err: any) => setError(err))
        .finally(() => setLoading(false))
    }
  }

  useEffect(() => {
    getData()
  }, [...dependencies])

  const refetch = () => getData()

  return { data, loading, error, refetch }
}

export default useFetch
