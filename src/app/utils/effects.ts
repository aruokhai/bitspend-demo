import { Observable, catchError, map, of } from "rxjs";


export function dispatchAction(response: any): Observable<any | null> {
  return response.pipe(
    map((res: any) => {
      return res;
    }),
    catchError((error: any) => {
      console.error(error);
      return of(null);
    })
  );
}
