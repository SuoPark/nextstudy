import { GetServerSideProps, GetServerSidePropsContext } from 'next/types'

export function isInstanceOfAPIError(object: unknown): object is ApiError {
  return object instanceof ApiError && ('redirectUrl' in object || 'notFound' in object)
}

export class ApiError extends Error {
  redirectUrl = ''
  notFound = false
}

export class NotFoundError extends ApiError {
  name = 'NotFoundError'
  message = '찾을 수 없습니다.'
  notFound = true
}

export class AuthError extends ApiError {
  name = 'AuthError'
  message = '인증되지 않은 사용자입니다.'
  redirectUrl = '/401'
}

export default function withGetServerSideProps(getServerSideProps: GetServerSideProps): GetServerSideProps {
  return async (context: GetServerSidePropsContext) => {
    try {
      return await getServerSideProps(context)
    } catch (error: any) {
      // apiError라면
      if (isInstanceOfAPIError(error)) {
        const { redirectUrl, notFound } = error
        if (notFound) {
          return {
            notFound: true
          }
        }

        return {
          redirect: {
            destination: redirectUrl,
            permanent: false
          }
        }
      }

      throw error
    }
  }
}
