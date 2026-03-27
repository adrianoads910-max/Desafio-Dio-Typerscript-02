import { Button as ChakraButton } from "@chakra-ui/react"

interface IButton {
  label: string
  onClick: () => void
}

export const Button = ({ label, onClick }: IButton) => {
  return (
    <ChakraButton
      onClick={onClick}
      width="100%"
      bg="purple.600"
      color="white"
      _hover={{ bg: "purple.500" }}
      _active={{ bg: "purple.700" }}
      size="md"
      borderRadius="lg"
    >
      {label}
    </ChakraButton>
  )
}

export default Button