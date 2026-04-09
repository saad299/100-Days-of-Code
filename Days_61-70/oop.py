import json

# class Car:
#     def __init__(self, brand, model, year, speed):
#         self.brand = brand
#         self.model = model
#         self.year = year
#         self.speed = 0

#     def accelerate(self, amount):
#         self.speed += amount

#     def brake(self, amount):
#         self.speed -= max(0, self.speed - amount)

#     def show_info(self):
#         print(f"Brand: {self.brand}")
#         print(f"Model: {self.model}")
#         print(f"Year: {self.year}")
#         print(f"Speed: {self.speed}")

# print("Class Car")
# print("-" * 20)
# car1 = Car("Toyota", "Camry", 2022, 0)
# car1.accelerate(50)
# car1.show_info()
# car1.brake(20)
# car1.show_info()
# print("-" * 20)
# car2 = Car("BMW", "X5", 2022, 0)
# car2.accelerate(70)
# car2.show_info()
# car2.brake(20)
# car2.show_info()

print("-" * 20)


class Book:
    def __init__(self, title, author, genre):
        self.title = title
        self.author = author
        self.genre = genre
        self.is_borrowed = False

    def borrow(self):
        if self.is_borrowed:
            print("Book is already borrowed")
        else:
            self.is_borrowed = True

    def return_book(self):
        self.is_borrowed = False

    def show_info(self):
        print(f"Title: {self.title}")
        print(f"Author: {self.author}")
        print(f"Genre: {self.genre}")
        print(f"Is borrowed: {self.is_borrowed}")


class Library:
    def __init__(self, name):
        self.name = name
        self.books = []

    def add_book(self, book):
        self.books.append(book)

    def remove_book(self, book):
        self.books.remove(book)

    def show_books(self):
        for book in self.books:
            book.show_info()


lib = Library("My Library")
book1 = Book("The Great Gatsby", "F. Scott Fitzgerald", "Fiction")
book2 = Book("To Kill a Mockingbird", "Harper Lee", "Fiction")

with open("books.json", "w") as f:
    json.dump([book1.__dict__, book2.__dict__], f)

with open("books.json", "r") as f:
    books_file = json.load(f)

loaded_books = [Book(b["title"], b["author"], b["genre"]) for b in books_file]

# lib.add_book(book1)
lib.add_book(loaded_books[0])

lib.add_book(book2)
lib.show_books()
print("---Borrowed---")
book1.borrow()
lib.show_books()
print("---Returned---")
book1.return_book()
lib.show_books()
