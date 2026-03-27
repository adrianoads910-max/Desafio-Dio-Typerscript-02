import { Avatar, HStack, Text } from "@chakra-ui/react"

export const Header = () => {
  return (
    <HStack
      gap="3"
      padding="4"
      bg="gray.900"
      borderBottom="1px solid"
      borderColor="gray.800"
      justify="space-between"
    >
      <Text className="text-white font-bold text-xl tracking-wide">
        🔐 MyApp
      </Text>
      <Avatar
        size="lg"
        name="default"
    
      />
    </HStack>
  )
}

export default Header