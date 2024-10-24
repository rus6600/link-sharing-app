import { observable, runInAction } from 'mobx'
import {
    MutationObserver,
    MutationObserverOptions,
    MutationObserverResult,
    QueryClient,
} from '@tanstack/react-query'
export class MobxMutation<
    TData = unknown,
    TError = unknown,
    TVariables = void,
    TContext = unknown,
> {
    private readonly reactMutationResult = observable(
        {},
        { deep: false }
    ) as MutationObserverResult<TData, TError>
    private observer?: MutationObserver<TData, TError, TVariables, TContext>
    private unsubscribe?: () => void

    constructor(
        private defaultOptions: () => MutationObserverOptions<
            TData,
            TError,
            TVariables,
            TContext
        >,
        private queryClient: QueryClient
    ) {}

    mutate(
        variables: TVariables,
        options?: MutationObserverOptions<TData, TError, TVariables, TContext>
    ): MutationObserverResult<TData, TError> {
        this.mutateAsync(variables, options).catch(noop)
        return this.reactMutationResult
    }

    async mutateAsync(
        variables: TVariables,
        options?: MutationObserverOptions<TData, TError, TVariables, TContext>
    ): Promise<MutationObserverResult<TData, TError>> {
        if (this.unsubscribe) {
            this.unsubscribe?.()
        }

        this.observer = new MutationObserver(
            this.queryClient,
            this.defaultOptions()
        )
        this.unsubscribe = this.observer.subscribe((result) =>
            runInAction(() => Object.assign(this.reactMutationResult, result))
        )

        try {
            await this.observer.mutate(variables, options)
        } catch (e) {
            console.log(e)
        }
        return this.reactMutationResult
    }

    dispose() {
        this.unsubscribe?.()
    }
}

function noop() {}
