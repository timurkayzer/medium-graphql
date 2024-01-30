import { Module } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostResolver } from './post.resolver';
import { PostService } from './post.service';

@Module({
  providers: [PostResolver, PostService, Post],
})
export class PostModule {}
