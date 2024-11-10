import { createAtom } from 'mobx'
import {
    MutationObserver,
    MutationObserverOptions,
    QueryClient,
} from '@tanstack/react-query'

export class MobxMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
> {
    private atom = createAtom(
        'Mutation',
        () => this.startTracking(),
        () => this.stopTracking()
    )
    private queryObserver = new MutationObserver(
        this.queryClient,
        this.defaultQueryOptions
    )
    constructor(
        private defaultOptions: MutationObserverOptions<
            TData,
            TError,
            TVariables,
            TContext
        >,
        private queryClient: QueryClient
    ) {}
    private get defaultQueryOptions() {
        return this.queryClient.defaultMutationOptions(this.defaultOptions)
    }
    async mutate(formData: TVariables) {
        this.atom.reportObserved()
        await this.queryObserver.mutate(formData)
    }
    status() {
        this.atom.reportObserved()
        return this.queryObserver.getCurrentResult()
    }
    reset() {
        this.atom.reportChanged()
        this.queryObserver.reset()
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
