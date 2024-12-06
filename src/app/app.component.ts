import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'blogApp';
  authors: any[] = [];
  blogs: any[] = [];
  allBlogs: any[] = [];
  selectedAuthor: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchAuthors();
    this.fetchAllBlogs();
  }

  // Fetch all authors
  fetchAuthors() {
    this.http.get<any[]>('http://localhost:400/api/authors').subscribe({
      next: (data: any[]) => (this.authors = data),
      error: (err: any) => console.error('Error fetching authors:', err)
    });
  }

  // Fetch all blogs
  fetchAllBlogs() {
    this.http.get<any[]>('http://localhost:400/api/blogs').subscribe({
      next: (data: any[]) => (this.allBlogs = data),
      error: (err: any) => console.error('Error fetching all blogs:', err)
    });
  }

  // Fetch blogs by selected author
  onAuthorSelect(authorForm: any) {
    if (!this.selectedAuthor) return;
    this.http.get<any[]>(`http://localhost:400/api/blogs/author/${this.selectedAuthor}`).subscribe({
      next: (data: any[]) => (this.blogs = data),
      error: (err: any) => console.error('Error fetching blogs by author:', err)
    });
  }

  // Trigger adding a new blog
  onAddBlog() {
    console.log('Add blog functionality to be implemented');
  }
}
