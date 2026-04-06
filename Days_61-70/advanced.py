## Classes and Objects

## Class

print("Class Example")
print("-" * 20)
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print("Hello, my name is", self.name)
    
    def __str__(self):
        return f"{self.name} is {self.age} years old"
    
person = Person("Saad", 25)
print(person)
person.greet()
print("=" * 20)