import { redirect } from 'react-router-dom'

export default async function loader () {
  return redirect('/app/homepage')
};
