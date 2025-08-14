import { toast } from 'sonner'

export const useToast = () => {
    return {
        success: (message, options = {}) => toast.success(message, options),
        error: (message, options = {}) => toast.error(message, options),
        info: (message, options = {}) => toast.info(message, options),
        warning: (message, options = {}) => toast.warning(message, options),
        loading: (message, options = {}) => toast.loading(message, options),
        custom: (component, options = {}) => toast.custom(component, options),
        promise: (promise, options = {}) => toast.promise(promise, options),
        dismiss: (id) => toast.dismiss(id),
        message: (message, options = {}) => toast.message(message, options)
    }
}

export default useToast
