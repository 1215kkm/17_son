'use client';

import { useState } from 'react';
import { Header } from '@/components/layout';
import { Card, Tag } from '@/components/ui';
import { Icon } from '@/components/ui/Icon';

// 더미 게시글 데이터
const dummyPosts = [
  {
    id: 1,
    category: '질문',
    title: '사랑니 발치 후 어떤 음식을 먹어야 하나요?',
    content: '오늘 사랑니 뺐는데 너무 배고파요... 언제부터 밥 먹어도 될까요?',
    author: '치아조심',
    createdAt: '1시간 전',
    likes: 12,
    comments: 8,
  },
  {
    id: 2,
    category: '후기',
    title: '스케일링 처음 받아봤어요',
    content: '생각보다 안 아프고 개운하네요! 6개월마다 받아야겠어요 ㅎㅎ',
    author: '치과초보',
    createdAt: '3시간 전',
    likes: 24,
    comments: 5,
  },
  {
    id: 3,
    category: '정보',
    title: '치과 건강보험 적용 항목 정리',
    content: '스케일링 연 1회, 레진 충전 등 보험 적용되는 항목 정리해봤습니다.',
    author: '정보왕',
    createdAt: '5시간 전',
    likes: 56,
    comments: 12,
  },
  {
    id: 4,
    category: '질문',
    title: '임플란트 vs 브릿지 뭐가 나을까요?',
    content: '어금니 하나를 발치해야 하는데 어떤 걸로 해야 할지 고민이에요.',
    author: '치아고민',
    createdAt: '어제',
    likes: 18,
    comments: 15,
  },
  {
    id: 5,
    category: '후기',
    title: '교정 2년차 후기입니다',
    content: '이제 거의 끝나가는데 정말 하길 잘했어요. 사진 첨부합니다.',
    author: '교정러',
    createdAt: '어제',
    likes: 89,
    comments: 23,
  },
];

const categories = ['전체', '질문', '후기', '정보'];

const categoryColors: { [key: string]: 'primary' | 'success' | 'warning' } = {
  질문: 'primary',
  후기: 'success',
  정보: 'warning',
};

export default function CommunityPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const filteredPosts =
    selectedCategory === '전체'
      ? dummyPosts
      : dummyPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header title="커뮤니티" />

      <main className="pt-[var(--header-height)] px-5 pb-24">
        {/* 페이지 헤더 */}
        <div className="py-4">
          <h1 className="text-[var(--text-2xl)] font-bold">치아 이야기</h1>
          <p className="text-[var(--foreground-secondary)] mt-1">
            치과 경험과 정보를 나눠보세요
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-[var(--text-sm)] font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--color-primary-400)] text-white'
                  : 'bg-[var(--color-gray-100)] text-[var(--foreground-secondary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="space-y-3">
          {filteredPosts.map((post) => (
            <Card key={post.id} clickable>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Tag variant={categoryColors[post.category]} size="sm">
                      {post.category}
                    </Tag>
                    <span className="text-[var(--text-xs)] text-[var(--foreground-tertiary)]">
                      {post.createdAt}
                    </span>
                  </div>
                  <h3 className="text-[var(--text-base)] font-semibold line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-[var(--text-sm)] text-[var(--foreground-secondary)] mt-1 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-[var(--text-sm)] text-[var(--foreground-tertiary)]">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Icon name="heart" size={14} />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="message-circle" size={14} />
                      {post.comments}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* 준비 중 안내 */}
        <div className="mt-6 bg-[var(--color-gray-100)] rounded-[var(--radius-md)] p-4">
          <p className="text-[var(--text-sm)] text-[var(--foreground-tertiary)] text-center">
            ℹ️ 커뮤니티 기능은 준비 중입니다.<br />
            현재 더미 데이터로 UI를 미리 보여드려요.
          </p>
        </div>
      </main>

      {/* 글쓰기 FAB */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-[var(--color-primary-400)] text-white rounded-full shadow-lg flex items-center justify-center">
        <Icon name="plus" size={24} color="white" />
      </button>
    </div>
  );
}
