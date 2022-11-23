import { redirect } from 'react-router-dom'

export default function loader (redirectPath: string) {
  return redirect(redirectPath)
};
