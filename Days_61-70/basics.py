print("Hello")

## Variable and data types

name = "Saad"
print(name)



## Data types

# String
name = "Saad"
print(name)

# Integer
age = 25
print(age)

# Float
height = 5.9
print(height)

# Boolean
is_student = True
print(is_student)



## Comparison operators

# == (equal to)
print(5 == 5)  # True

# != (not equal to)
print(5 != 5)  # False

# > (greater than)
print(5 > 3)  # True

# < (less than)
print(5 < 3)  # False

# >= (greater than or equal to)
print(5 >= 5)  # True

# <= (less than or equal to)
print(5 <= 3)  # False



## Logical operators

# and
print(True and True)  # True
print(True and False)  # False
print(False and False)  # False

# or
print(True or True)  # True
print(True or False)  # True
print(False or False)  # False

# not
print(not True)  # False
print(not False)  # True




## Conditionals (if/elif/else)
age = 30

if (age > 18):
    print("You are an adult")
elif (age > 13):
    print("You are a teenager")
else:
    print("You are a child")



## Loops (for and while)

# for loop
for i in range(5):
    print(i)

# while loop
i = 0
while i < 5:
    print(i)
    i += 1



## Functions

def greet():
    print("Hello")
    
greet()

def greet(name):
    print("Hello", name)
    
greet("Saad")

def add(a, b):
    return a + b
    
print(add(5, 3))



## Data Structures (List/Sets/Tuples/Dictionaries)

# List
fruits = ["apple", "banana", "orange"]
print(fruits)

# Set
fruits = {"apple", "banana", "orange"}
print(fruits)

# Tuple
fruits = ("apple", "banana", "orange")
print(fruits)

# Dictionary
person = {"name": "Saad", "age": 25}
print(person)
## looping through dictionaries
for key, value in person.items():
    print(key, value)



## Loops and iteration

numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)

# break
for i in range(10):
    if i == 5:
        break
    print(i)

# continue
for i in range(10):
    if i == 5:
        continue
    print(i)

### range

for i in range(5, 10):
    print(i)

### Nested loops

for i in range(5):
    for j in range(5):
        print(i, j)



## Working with JSON

import json

data = {
    "name": "Saad",
    "age": 25
}

json_data = json.dumps(data)
print(json_data)



## Classes and Objects

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