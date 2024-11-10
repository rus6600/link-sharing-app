import { createAtom } from 'mobx'
import {
    DefaultedQueryObserverOptions,
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
    readonly defaultOptions: DefaultedQueryObserverOptions<
        TQueryFnData,
        TError,
        TData,
        TQueryData,
        TQueryKey
    >
    private readonly observer: QueryObserver<
        TQueryFnData,
        TError,
        TData,
        TQueryData,
        TQueryKey
    >
    private atom = createAtom(
        'query',
        () => this.startTracking(),
        () => this.stopTracking()
    )
    constructor(
        options: QueryObserverOptions<
            TQueryFnData,
            TError,
            TData,
            TQueryData,
            TQueryKey
        >,
        private queryClient: QueryClient
    ) {
        const defaultOptions = queryClient.defaultQueryOptions(options)
        this.defaultOptions = defaultOptions
        this.observer = new QueryObserver(this.queryClient, defaultOptions)
    }

    query() {
        this.atom.reportObserved()
        return this.observer.getCurrentResult()
    }

    update() {
        return this.queryClient
    }

    private unsubscribe() {}

    private startTracking() {
        console.log('start tracking')
        if (this.observer) {
            this.unsubscribe = this.observer.subscribe(() => {
                this.atom.reportChanged()
            })
        }
    }
    private stopTracking() {
        console.log('stopeed tracking')
        this.unsubscribe()
    }
}
