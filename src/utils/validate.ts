export default function validateTodoText(value: string): boolean {
	if (value.length < 2 || value.length > 64) {
		return false
	} else {
		return true
	}
}
