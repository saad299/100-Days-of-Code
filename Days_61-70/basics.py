print("Hello")

## Variable and data types
print("Variable")
name = "Saad"
print(name)


## Data types

# String
print("String")
name = "Saad"
print(name)

# Integer
print("Integer")
age = 25
print(age)

# Float
print("Float")
height = 5.9
print(height)

# Boolean
print("Boolean")
is_student = True
print(is_student)


## Comparison operators
print("Comparison operators")
# == (equal to)
print("Equal to")
print(5 == 5)  # True

# != (not equal to)
print("Not equal to")
print(5 != 5)  # False

# > (greater than)
print("Greater than")
print(5 > 3)  # True

# < (less than)
print("Less than")
print(5 < 3)  # False

# >= (greater than or equal to)
print("Greater than or equal to")
print(5 >= 5)  # True

# <= (less than or equal to)
print("Less than or equal to")
print(5 <= 3)  # False


## Logical operators
print("Logical operators")
# and
print("and")
print(True and True)  # True
print(True and False)  # False
print(False and False)  # False

# or
print("or")
print(True or True)  # True
print(True or False)  # True
print(False or False)  # False

# not
print("not")
print(not True)  # False
print(not False)  # True


## Conditionals (if/elif/else)
print("Conditionals")
age = 30

if age > 18:
    print("You are an adult")
elif age > 13:
    print("You are a teenager")
else:
    print("You are a child")


## Loops (for and while)
print("Loops")

# for loop
for i in range(5):
    print(i)

# while loop
i = 0
while i < 5:
    print(i)
    i += 1


## Functions
print("Functions")


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
print("Data Structures")

# List
print("List")
fruits = ["apple", "banana", "orange"]
print(fruits)

# Set
print("Set")
fruits = {"apple", "banana", "orange"}
print(fruits)

# Tuple
print("Tuple")
fruits = ("apple", "banana", "orange")
print(fruits)

# Dictionary
print("Dictionary")
person = {"name": "Saad", "age": 25}
print(person)
## looping through dictionaries
for key, value in person.items():
    print(key, value)


## Loops and iteration

print("Loops and iteration")
numbers = [1, 2, 3, 4, 5]
for number in numbers:
    print(number)

# break
print("Break")
for i in range(10):
    if i == 5:
        break
    print(i)

# continue
print("Continue")
for i in range(10):
    if i == 5:
        continue
    print(i)

# range
print("Range")
for i in range(5, 10):
    print(i)

# Nested loops
print("Nested loops")
for i in range(5):
    for j in range(5):
        for k in range(5):
            print(i, j, k)


## Working with JSON

print("Working with JSON")
import json

data = {"name": "Saad", "age": 25}

json_data = json.dumps(data)
print(json_data)
