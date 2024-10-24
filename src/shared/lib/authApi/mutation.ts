import { createAtom } from 'mobx'
import {
    MutationObserver,
    MutationObserverOptions,
    QueryClient,
} from '@tanstack/react-query'

export class AuthMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
> {
    private atom = createAtom(
        'AuthMutation',
        () => this.startTracking(),
        () => this.stopTracking()
    )
    private queryObserver = new MutationObserver(
        this.queryClient,
        this.defaultQueryOptions
    )
    constructor(
        private defaultOptions: () => MutationObserverOptions<
            TData,
            TError,
            TVariables,
            TContext
        >,
        private queryClient: QueryClient
    ) {}
    private get defaultQueryOptions() {
        return this.queryClient.defaultMutationOptions(this.defaultOptions())
    }
    getInstance() {
        this.atom.reportObserved()
        return this.queryObserver
    }

    private unsubscribe() {}

    private startTracking() {
        console.log('start mutation tracking')
        this.unsubscribe = this.queryObserver.subscribe(() => {
            this.atom.reportChanged()
        })
    }
    private stopTracking() {
        this.unsubscribe()
    }
}
