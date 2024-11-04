import { createAtom } from 'mobx'
import {
    QueryClient,
    QueryKey,
    QueryObserver,
    QueryObserverOptions,
} from '@tanstack/react-query'

export class MobxQuery<
    TQueryFnData = unknown,
    TError = unknown,
    TData = TQueryFnData,
    TQueryData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
> {
    private atom = createAtom(
        'AuthQuery',
        () => this.startTracking(),
        () => this.stopTracking()
    )
    private queryObserver = new QueryObserver(
        this.queryClient,
        this.defaultQueryOptions
    )
    constructor(
        private getOptions: () => QueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            TQueryData,
            TQueryKey
        >,
        private queryClient: QueryClient
    ) {}

    query() {
        this.atom.reportObserved()
        return this.queryObserver.getOptimisticResult(this.defaultQueryOptions)
    }

    update() {
        return this.queryClient
    }

    private unsubscribe() {}

    private startTracking() {
        console.log('start tracking')
        this.unsubscribe = this.queryObserver.subscribe(() => {
            this.atom.reportChanged()
        })
    }
    private stopTracking() {
        console.log('stopeed tracking')
        this.unsubscribe()
    }
    private get defaultQueryOptions() {
        return this.queryClient.defaultQueryOptions(this.getOptions())
    }
}
